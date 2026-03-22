/**
 * Patch workerd to support win32 arm64 by mapping it to win32 x64.
 * This is required because workerd does not publish an arm64 Windows binary,
 * but Windows ARM64 can run x64 binaries via built-in emulation.
 *
 * This script is run as a postinstall hook.
 * It finds ALL copies of workerd in node_modules (including nested ones).
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

if (process.platform !== 'win32' || os.arch() !== 'arm64') {
  process.exit(0); // Only needed on win32 arm64
}

const ARM64_PATCH = '"win32 arm64 LE": "@cloudflare/workerd-windows-64"';
const SEARCH_TARGET = '"win32 x64 LE": "@cloudflare/workerd-windows-64"';

const nodeModules = path.join(__dirname, '..', 'node_modules');

// Recursively find all workerd directories in node_modules
function findWorkerdDirs(dir, depth = 0) {
  const results = [];
  if (depth > 5) return results;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const full = path.join(dir, entry.name);
      if (entry.name === 'workerd') {
        results.push(full);
      } else if (entry.name === 'node_modules') {
        results.push(...findWorkerdDirs(full, depth + 1));
      } else if (entry.name.startsWith('@')) {
        // Scan scoped package dirs for nested node_modules
        const scopedEntries = fs.readdirSync(full, { withFileTypes: true });
        for (const se of scopedEntries) {
          if (se.isDirectory()) {
            const nested = path.join(full, se.name, 'node_modules');
            if (fs.existsSync(nested)) {
              results.push(...findWorkerdDirs(nested, depth + 1));
            }
          }
        }
      }
    }
  } catch (e) { /* ignore permission errors */ }
  return results;
}

const workerdDirs = findWorkerdDirs(nodeModules);

if (workerdDirs.length === 0) {
  console.log('[patch-workerd] No workerd installations found — skipping');
  process.exit(0);
}

let patched = 0;
for (const workerdDir of workerdDirs) {
  const filesToPatch = [
    path.join(workerdDir, 'install.js'),
    path.join(workerdDir, 'bin', 'workerd'),
    path.join(workerdDir, 'lib', 'main.js'),
  ];

  for (const filePath of filesToPatch) {
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');

    if (content.includes(ARM64_PATCH)) continue;

    const updated = content.replace(SEARCH_TARGET, `${SEARCH_TARGET},\n  ${ARM64_PATCH}`);

    if (updated === content) continue;

    fs.writeFileSync(filePath, updated, 'utf8');
    const rel = path.relative(nodeModules, filePath);
    console.log(`[patch-workerd] Patched ${rel}`);
    patched++;
  }
}

console.log(`[patch-workerd] Done — ${patched} file(s) patched across ${workerdDirs.length} workerd installation(s)`);
