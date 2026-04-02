#!/usr/bin/env node
/**
 * Generate a branded 1200x630 OG image for isio.ro using sharp.
 */
import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="100%" stop-color="#0f1018"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.06)"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-grad)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>

  <!-- Accent line top -->
  <rect x="0" y="0" width="1200" height="3" fill="url(#accent)"/>

  <!-- Large network motif (decorative, top-right) -->
  <g opacity="0.08">
    <line x1="850" y1="80" x2="1050" y2="40" stroke="url(#accent)" stroke-width="3"/>
    <line x1="1050" y1="40" x2="1100" y2="180" stroke="url(#accent)" stroke-width="3"/>
    <line x1="1100" y1="180" x2="850" y2="80" stroke="url(#accent)" stroke-width="3"/>
    <line x1="950" y1="160" x2="1100" y2="180" stroke="url(#accent)" stroke-width="2"/>
    <line x1="950" y1="160" x2="850" y2="80" stroke="url(#accent)" stroke-width="2"/>
    <circle cx="850" cy="80" r="8" fill="url(#accent)"/>
    <circle cx="1050" cy="40" r="12" fill="url(#accent)"/>
    <circle cx="1100" cy="180" r="10" fill="url(#accent)"/>
    <circle cx="950" cy="160" r="6" fill="url(#accent)"/>
  </g>

  <!-- ISIO logo letters (centered, scaled from logo.svg) -->
  <g transform="translate(310,195) scale(2.6)">
    <g transform="translate(0,40) scale(1,0.7) translate(0,-40)">
      <rect x="10" y="16" width="10" height="50" fill="white"/>
      <path d="M 37,16 L 77,16 A 5,5 0 0 1 82,21 L 82,26 L 42,26 L 42,36 L 82,36 L 82,61 A 5,5 0 0 1 77,66 L 37,66 A 5,5 0 0 1 32,61 L 32,56 L 72,56 L 72,46 L 32,46 L 32,21 A 5,5 0 0 1 37,16 Z" fill="white"/>
      <rect x="96" y="16" width="10" height="50" fill="white"/>
      <path d="M 139,16 L 163,16 A 15,15 0 0 1 178,31 L 178,51 A 15,15 0 0 1 163,66 L 139,66 A 15,15 0 0 1 124,51 L 124,31 A 15,15 0 0 1 139,16 Z M 142,26 L 160,26 A 8,8 0 0 1 168,34 L 168,48 A 8,8 0 0 1 160,56 L 142,56 A 8,8 0 0 1 134,48 L 134,34 A 8,8 0 0 1 142,26 Z" fill="white" fill-rule="evenodd"/>
    </g>
    <g>
      <line x1="192" y1="26" x2="212" y2="14" stroke="url(#accent)" stroke-width="1.8" opacity="0.6"/>
      <line x1="192" y1="26" x2="214" y2="30" stroke="url(#accent)" stroke-width="1.8" opacity="0.6"/>
      <line x1="212" y1="14" x2="214" y2="30" stroke="url(#accent)" stroke-width="1.8" opacity="0.6"/>
      <circle cx="192" cy="26" r="3.5" fill="url(#accent)"/>
      <circle cx="212" cy="14" r="5.5" fill="url(#accent)"/>
      <circle cx="214" cy="30" r="4" fill="url(#accent)"/>
    </g>
  </g>

  <!-- Tagline -->
  <text x="600" y="418" text-anchor="middle" fill="rgba(255,255,255,0.45)" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="400" letter-spacing="0.15em">WEB DEVELOPMENT AGENCY</text>

  <!-- URL -->
  <text x="600" y="462" text-anchor="middle" fill="url(#accent)" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="500" letter-spacing="0.05em">isio.ro</text>

  <!-- Bottom accent line -->
  <rect x="0" y="627" width="1200" height="3" fill="url(#accent)"/>
</svg>`;

const outPath = join(__dirname, '..', 'public', 'og.png');
await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`Generated ${outPath} (1200x630)`);
