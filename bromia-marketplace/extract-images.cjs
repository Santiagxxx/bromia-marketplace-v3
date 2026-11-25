const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.slice(4, 8 + len);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

function encodePNG(width, height, rgbaBuffer) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  const scanlines = Buffer.alloc(height * (1 + width * 4));
  let srcPos = 0;
  let dstPos = 0;
  for (let y = 0; y < height; y++) {
    scanlines[dstPos++] = 0;
    rgbaBuffer.copy(scanlines, dstPos, srcPos, srcPos + width * 4);
    dstPos += width * 4;
    srcPos += width * 4;
  }

  const idatChunk = makeChunk('IDAT', zlib.deflateSync(scanlines));
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const pdfPath = path.resolve(__dirname, 'frontend/public/catalogo.pdf');
const buf = fs.readFileSync(pdfPath);
const str = buf.toString('latin1');
const objMap = new Map();
const objRegex = /(\d+)\s+(\d+)\s+obj\b/g;

let m;
const positions = [];
while ((m = objRegex.exec(str)) !== null) {
  positions.push({ id: parseInt(m[1]), gen: parseInt(m[2]), start: m.index });
}

for (let i = 0; i < positions.length; i++) {
  const cur = positions[i];
  const nextStart = (i + 1 < positions.length) ? positions[i + 1].start : buf.length;
  const chunkStr = str.substring(cur.start, Math.min(cur.start + 1000, nextStart));
  const streamIdx = chunkStr.indexOf('stream');
  if (streamIdx !== -1) {
    let streamStart = cur.start + streamIdx + 6;
    if (buf[streamStart] === 0x0D && buf[streamStart + 1] === 0x0A) streamStart += 2;
    else if (buf[streamStart] === 0x0A || buf[streamStart] === 0x0D) streamStart += 1;
    
    const endstreamPos = str.indexOf('endstream', streamStart);
    if (endstreamPos !== -1) {
      let streamEnd = endstreamPos;
      if (buf[streamEnd - 2] === 0x0D && buf[streamEnd - 1] === 0x0A) streamEnd -= 2;
      else if (buf[streamEnd - 1] === 0x0A || buf[streamEnd - 1] === 0x0D) streamEnd -= 1;
      
      const header = chunkStr.substring(0, streamIdx);
      const streamBuf = buf.subarray(streamStart, streamEnd);
      objMap.set(cur.id, { header, streamBuf });
    }
  }
}

const outDir = path.resolve(__dirname, 'frontend/public/products');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let savedCount = 0;
const manifest = [];

for (const [id, obj] of objMap.entries()) {
  if (!obj.header || (!obj.header.includes('/Subtype/Image') && !obj.header.includes('/Subtype /Image'))) continue;
  
  const w = parseInt(obj.header.match(/\/Width\s+(\d+)/)?.[1]);
  const h = parseInt(obj.header.match(/\/Height\s+(\d+)/)?.[1]);
  const smaskId = parseInt(obj.header.match(/\/SMask\s+(\d+)\s+\d+\s+R/)?.[1]);
  const isGray = obj.header.includes('/DeviceGray');
  
  if (isGray && !smaskId) continue;
  if (!w || !h || !obj.streamBuf) continue;
  
  try {
    const rawRgb = zlib.inflateSync(obj.streamBuf);
    let smaskBuf = null;
    if (smaskId && objMap.has(smaskId)) {
      try {
        smaskBuf = zlib.inflateSync(objMap.get(smaskId).streamBuf);
      } catch (err) {}
    }
    
    const rgba = Buffer.alloc(w * h * 4);
    for (let i = 0; i < w * h; i++) {
      if (rawRgb.length >= (i + 1) * 3) {
        rgba[i * 4] = rawRgb[i * 3];
        rgba[i * 4 + 1] = rawRgb[i * 3 + 1];
        rgba[i * 4 + 2] = rawRgb[i * 3 + 2];
      }
      rgba[i * 4 + 3] = (smaskBuf && smaskBuf.length > i) ? smaskBuf[i] : 255;
    }
    
    const png = encodePNG(w, h, rgba);
    const filename = `img_${id}_${w}x${h}.png`;
    fs.writeFileSync(path.join(outDir, filename), png);
    manifest.push({ id, w, h, smaskId, filename, size: png.length });
    savedCount++;
  } catch (err) {
    console.log('Failed decoding obj', id, err.message);
  }
}

fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Extraction complete! Total saved:', savedCount);
