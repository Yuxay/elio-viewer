// Generate minimal valid PNG icons for PWA
import { writeFileSync } from 'fs'
import { deflateSync } from 'zlib'

// Minimal 192x192 blue square PNG (valid PNG binary)
function createPNG(size, r, g, b) {
  // Build a minimal PNG with IDAT chunk
  
  // Scanlines: filter byte (0) + RGB pixels
  const rawData = Buffer.alloc(size * size * 3 + size) // +size for filter bytes
  for (let y = 0; y < size; y++) {
    rawData[y * (size * 3 + 1)] = 0 // filter: none
    for (let x = 0; x < size; x++) {
      const offset = y * (size * 3 + 1) + 1 + x * 3
      rawData[offset] = r
      rawData[offset + 1] = g
      rawData[offset + 2] = b
    }
  }

  const compressed = deflateSync(rawData)
  
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  
  // IHDR
  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(size, 0)
  ihdrData.writeUInt32BE(size, 4)
  ihdrData[8] = 8 // bit depth
  ihdrData[9] = 2 // color type: RGB
  ihdrData[10] = 0 // compression
  ihdrData[11] = 0 // filter
  ihdrData[12] = 0 // interlace
  const ihdr = createChunk('IHDR', ihdrData)
  
  // IDAT
  const idat = createChunk('IDAT', compressed)
  
  // IEND
  const iend = createChunk('IEND', Buffer.alloc(0))
  
  return Buffer.concat([signature, ihdr, idat, iend])
}

function createChunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length, 0)
  const typeB = Buffer.from(type, 'ascii')
  const crc = crc32(Buffer.concat([typeB, data]))
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc, 0)
  return Buffer.concat([length, typeB, data, crcBuf])
}

function crc32(buf) {
  let crc = 0xFFFFFFFF
  for (const byte of buf) {
    crc ^= byte
    for (let i = 0; i < 8; i++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0)
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0
}

// Generate icons: blue rounded-rect representation
const icon192 = createPNG(192, 91, 106, 240)
const icon512 = createPNG(512, 91, 106, 240)

writeFileSync('public/icon-192.png', icon192)
writeFileSync('public/icon-512.png', icon512)

console.log('Icons generated: icon-192.png, icon-512.png')
