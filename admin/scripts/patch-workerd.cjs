/**
 * Patch workerd to support win32 arm64 by mapping it to win32 x64.
 * This is required because workerd does not publish an arm64 Windows binary,
 * but Windows ARM64 can run x64 binaries via built-in emulation.
 *
 * This script is run as a postinstall hook.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

if (process.platform !== 'win32' || os.arch() !== 'arm64') {
  process.exit(0); // Only needed on win32 arm64
}

const files = [
  path.join(__dirname, '..', 'node_modules', 'workerd', 'install.js'),
  path.join(__dirname, '..', 'node_modules', 'workerd', 'bin', 'workerd'),
];

const ARM64_PATCH = '"win32 arm64 LE": "@cloudflare/workerd-windows-64"';

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    console.log(`[patch-workerd] ${path.basename(filePath)} not found — skipping`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');

  if (content.includes(ARM64_PATCH)) {
    console.log(`[patch-workerd] ${path.basename(filePath)} already patched — skipping`);
    continue;
  }

  const patched = content.replace(
    '"win32 x64 LE": "@cloudflare/workerd-windows-64"',
    `"win32 x64 LE": "@cloudflare/workerd-windows-64",\n  ${ARM64_PATCH}`
  );

  if (patched === content) {
    console.log(`[patch-workerd] Could not find replacement target in ${path.basename(filePath)}`);
    continue;
  }

  fs.writeFileSync(filePath, patched, 'utf8');
  console.log(`[patch-workerd] Patched ${path.basename(filePath)} for win32 arm64 support`);
}
