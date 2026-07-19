/**
 * Content type for an attachment, guessed from its filename.
 *
 * Atlassian stores whatever content type the upload declares, and it decides whether a browser previews the file or
 * offers it as a download. Sending `application/octet-stream` for everything turns every screenshot into an anonymous
 * blob, which is why this exists.
 *
 * The table is deliberately short: the formats people actually attach to issues and pages. A full database is a
 * megabyte of dependency for a lookup that misses nothing anyone will notice — an unknown extension simply falls back
 * to `application/octet-stream`, which is what the upload would have said anyway.
 */
const MIME_TYPES: Record<string, string> = {
  // Images
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  bmp: 'image/bmp',
  ico: 'image/vnd.microsoft.icon',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  avif: 'image/avif',
  heic: 'image/heic',

  // Documents
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  odt: 'application/vnd.oasis.opendocument.text',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  rtf: 'application/rtf',

  // Text and data
  txt: 'text/plain',
  md: 'text/markdown',
  csv: 'text/csv',
  tsv: 'text/tab-separated-values',
  log: 'text/plain',
  json: 'application/json',
  xml: 'application/xml',
  yaml: 'application/yaml',
  yml: 'application/yaml',
  html: 'text/html',
  htm: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  mjs: 'text/javascript',
  ts: 'text/plain',
  sql: 'application/sql',

  // Archives
  zip: 'application/zip',
  gz: 'application/gzip',
  tar: 'application/x-tar',
  '7z': 'application/x-7z-compressed',
  rar: 'application/vnd.rar',
  bz2: 'application/x-bzip2',

  // Media
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  avi: 'video/x-msvideo',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  m4a: 'audio/mp4',
};

export const DEFAULT_MIME_TYPE = 'application/octet-stream';

/**
 * The content type for `filename`, or `application/octet-stream` when the extension is unknown or absent.
 *
 * A leading dot is not an extension — `.gitignore` is a file called `.gitignore`, not a `gitignore` file.
 */
export function mimeTypeFor(filename: string): string {
  const lastDot = filename.lastIndexOf('.');

  if (lastDot <= 0) return DEFAULT_MIME_TYPE;

  return MIME_TYPES[filename.slice(lastDot + 1).toLowerCase()] ?? DEFAULT_MIME_TYPE;
}
