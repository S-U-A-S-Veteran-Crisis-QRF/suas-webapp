// Generates PWA icons as PNG files using only Node.js built-ins (no canvas/sharp needed).
// Creates navy-background + gold-border PNGs sized for the web manifest and Apple touch icon.
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function crc32(data) {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  let crc = 0xffffffff;
  for (const byte of data) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

// SUAS branding: navy #0A1628, gold #D4A017, cream #F8F4E8
const NAVY  = [10, 22, 40];
const GOLD  = [212, 160, 23];
const CREAM = [248, 244, 232];

function createSuasIconPNG(size) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB color type

  const borderPx = Math.max(4, Math.round(size * 0.04));
  const accentPx = Math.max(2, Math.round(size * 0.02));
  const center   = size / 2;
  const radius   = size * 0.38;

  const rowSize = 1 + size * 3;
  const raw = Buffer.alloc(size * rowSize);

  for (let y = 0; y < size; y++) {
    raw[y * rowSize] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const px = y * rowSize + 1 + x * 3;
      const onEdge = x < borderPx || x >= size - borderPx
                  || y < borderPx || y >= size - borderPx;
      // Inner gold accent ring
      const onRing = !onEdge && (
        x < borderPx + accentPx || x >= size - borderPx - accentPx ||
        y < borderPx + accentPx || y >= size - borderPx - accentPx
      );
      // Draw a simple cross/shield marker in the center
      const cx = x - center, cy = y - center;
      const inCircle = Math.sqrt(cx * cx + cy * cy) < radius;
      const crossH = Math.abs(cy) < size * 0.06 && Math.abs(cx) < size * 0.38;
      const crossV = Math.abs(cx) < size * 0.06 && Math.abs(cy) < size * 0.38;
      const onCross = inCircle && (crossH || crossV);

      let [r, g, b] = NAVY;
      if (onEdge)  [r, g, b] = NAVY;
      else if (onRing) [r, g, b] = GOLD;
      else if (onCross) [r, g, b] = CREAM;

      raw[px]   = r;
      raw[px+1] = g;
      raw[px+2] = b;
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG signature
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const outDir = path.join(__dirname, '..', 'public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

const specs = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
];
for (const { size, name } of specs) {
  fs.writeFileSync(path.join(outDir, name), createSuasIconPNG(size));
  console.log(`  ✓ public/icons/${name} (${size}×${size})`);
}

// icon.png in public root (referenced in JSON-LD schema.org logo)
fs.writeFileSync(path.join(__dirname, '..', 'public', 'icon.png'), createSuasIconPNG(512));
console.log('  ✓ public/icon.png (512×512)');
