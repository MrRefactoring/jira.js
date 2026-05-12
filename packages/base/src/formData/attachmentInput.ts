import type { Readable } from 'node:stream';

export type AttachmentContent =
  | File
  | Blob
  | Buffer
  | Readable
  | ReadableStream
  | AsyncIterable<Uint8Array | string>
  | string;

export type AttachmentInput = {
  filename: string;
  content: AttachmentContent;
};
