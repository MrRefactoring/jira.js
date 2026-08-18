import { deflateSync } from 'node:zlib';

/**
 * A valid PNG of a solid colour, built here rather than committed as a fixture.
 *
 * The avatar endpoints read the image: Jira answers "not a supported image format" to anything it cannot decode, so a
 * placeholder of arbitrary bytes proves nothing. Generating one keeps the suite free of a binary fixture, and keeps
 * the size a parameter — Jira refuses an avatar smaller than the crop it is asked for.
 */
export function pngBytes(side: number): Uint8Array<ArrayBuffer> {
  const scanlines = new Uint8Array(side * (1 + side * 3));

  for (let y = 0; y < side; y++) {
    const row = y * (1 + side * 3);

    scanlines[row] = 0;

    for (let x = 0; x < side; x++) {
      scanlines[row + 1 + x * 3] = 200;
      scanlines[row + 2 + x * 3] = 60;
      scanlines[row + 3 + x * 3] = 60;
    }
  }

  const header = new Uint8Array(13);
  const headerView = new DataView(header.buffer);

  headerView.setUint32(0, side);
  headerView.setUint32(4, side);
  header[8] = 8;
  header[9] = 2;

  const parts = [
    new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', new Uint8Array(deflateSync(scanlines))),
    chunk('IEND', new Uint8Array(0)),
  ];

  const png = new Uint8Array(parts.reduce((size, part) => size + part.length, 0));

  let at = 0;

  for (const part of parts) {
    png.set(part, at);
    at += part.length;
  }

  return png;
}

/** A PNG as the endpoints want it: a `Blob` carrying the content type they read it by. */
export function pngBlob(side: number): Blob {
  return new Blob([pngBytes(side)], { type: 'image/png' });
}

function chunk(type: string, data: Uint8Array): Uint8Array<ArrayBuffer> {
  const framed = new Uint8Array(12 + data.length);
  const view = new DataView(framed.buffer);

  view.setUint32(0, data.length);
  framed.set(new TextEncoder().encode(type), 4);
  framed.set(data, 8);
  view.setUint32(8 + data.length, crc32(framed.subarray(4, 8 + data.length)));

  return framed;
}

function crc32(bytes: Uint8Array): number {
  const table: number[] = [];

  for (let n = 0; n < 256; n++) {
    let c = n;

    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;

    table[n] = c;
  }

  let crc = 0xffffffff;

  for (const byte of bytes) crc = table[(crc ^ byte) & 0xff]! ^ (crc >>> 8);

  return (crc ^ 0xffffffff) >>> 0;
}
