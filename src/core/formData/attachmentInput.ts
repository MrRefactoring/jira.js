/**
 * Anything you can hand to an attachment endpoint as file content.
 *
 * Deliberately spelled with web types only, so the declaration compiles in a browser project that has no `@types/node`.
 * Nothing is lost by it: Node's `Buffer` extends `Uint8Array`, and a `Readable` stream is structurally an
 * `AsyncIterable`, so both still fit — they just are not named here.
 */
export type AttachmentContent =
  | File
  | Blob
  | Uint8Array
  | ReadableStream<Uint8Array | string>
  | AsyncIterable<Uint8Array | string>
  | string;

export type AttachmentInput = {
  filename: string;
  content: AttachmentContent;
};
