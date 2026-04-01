#!/usr/bin/env node
/**
 * Generate a minimal valid 1200x630 PNG with a solid dark background (#0a0a0f).
 * Uses raw Node.js buffer manipulation — no external dependencies.
 */
import { writeFileSync } from 'fs';
import { deflateSync } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const WIDTH = 1200;
const HEIGHT = 630;

// Background color: #0a0a0f
const R = 0x0a, G = 0x0a, B = 0x0f;

// Build raw pixel data: each row starts with filter byte (0 = None)
const rowSize = 1 + WIDTH * 3; // filter byte + RGB for each pixel
const rawData = Buffer.alloc(rowSize * HEIGHT);

for (let y = 0; y < HEIGHT; y++) {
  const offset = y * rowSize;
  rawData[offset] = 0; // filter: None
  for (let x = 0; x < WIDTH; x++) {
    const px = offset + 1 + x * 3;
    rawData[px] = R;
    rawData[px + 1] = G;
    rawData[px + 2] = B;
  }
}

const compressedData = deflateSync(rawData);

function crc32(buf) {
  let c;
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

// PNG signature
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

// IHDR chunk
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(WIDTH, 0);   // width
ihdrData.writeUInt32BE(HEIGHT, 4);  // height
ihdrData[8] = 8;                    // bit depth
ihdrData[9] = 2;                    // color type: RGB
ihdrData[10] = 0;                   // compression
ihdrData[11] = 0;                   // filter
ihdrData[12] = 0;                   // interlace

const ihdr = makeChunk('IHDR', ihdrData);
const idat = makeChunk('IDAT', compressedData);
const iend = makeChunk('IEND', Buffer.alloc(0));

const png = Buffer.concat([signature, ihdr, idat, iend]);

const outPath = join(__dirname, '..', 'public', 'og.png');
writeFileSync(outPath, png);
console.log(`Generated ${outPath} (${png.length} bytes, ${WIDTH}x${HEIGHT})`);
