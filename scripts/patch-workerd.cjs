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

const workerdMain = path.join(__dirname, '..', 'node_modules', 'workerd', 'lib', 'main.js');

if (!fs.existsSync(workerdMain)) {
  console.log('[patch-workerd] workerd/lib/main.js not found — skipping patch');
  process.exit(0);
}

const content = fs.readFileSync(workerdMain, 'utf8');

if (content.includes('"win32 arm64 LE"')) {
  console.log('[patch-workerd] Already patched — skipping');
  process.exit(0);
}

const patched = content.replace(
  '"win32 x64 LE": "@cloudflare/workerd-windows-64"',
  '"win32 x64 LE": "@cloudflare/workerd-windows-64",\n  "win32 arm64 LE": "@cloudflare/workerd-windows-64"'
);

if (patched === content) {
  console.log('[patch-workerd] Could not find replacement target — workerd may have changed format');
  process.exit(0);
}

fs.writeFileSync(workerdMain, patched, 'utf8');
console.log('[patch-workerd] Patched workerd/lib/main.js for win32 arm64 support');
