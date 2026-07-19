import type { AttachmentInput, AttachmentContent } from './attachmentInput.js';
import { mimeTypeFor } from './mimeType.js';
import { PRODUCT_SLUG } from '../productInfo.js';

export type MultipartRequestBody = {
  body: FormData | ReadableStream<Uint8Array>;
  headers?: Record<string, string>;
};

const textEncoder = new TextEncoder();

let streamingSupport: boolean | undefined;

/**
 * Whether this runtime accepts a `ReadableStream` as a request body.
 *
 * Node and Chromium do and signal it by reading `duplex`; Firefox and Safari do not, and the option stays untouched.
 * Detecting it this way rather than by sniffing for `process` matters: bundlers routinely shim `process` as an empty
 * object, where reading `process.versions.node` throws outright.
 *
 * The probe constructs a request and discards it, so the caller's own stream is never touched.
 */
function supportsRequestStreaming(): boolean {
  if (streamingSupport !== undefined) return streamingSupport;

  if (typeof Request === 'undefined' || typeof ReadableStream === 'undefined') {
    streamingSupport = false;

    return streamingSupport;
  }

  let duplexRead = false;

  try {
    new Request('https://streaming.probe.invalid', {
      method: 'POST',
      body: new ReadableStream(),
      get duplex() {
        duplexRead = true;

        return 'half';
      },
    } as RequestInit);
  } catch {
    // A runtime that refuses a stream body outright cannot stream either.
    duplexRead = false;
  }

  streamingSupport = duplexRead;

  return streamingSupport;
}

function isAsyncIterable(value: unknown): value is AsyncIterable<Uint8Array | string> {
  if (value == null) return false;

  return typeof (value as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] === 'function';
}

/** Node's `Buffer` is a `Uint8Array`, so the structural check covers it without naming a Node type. */
function isBytes(value: unknown): value is Uint8Array {
  return ArrayBuffer.isView(value) && !(value instanceof DataView);
}

function isStreamLikeContent(content: AttachmentContent): boolean {
  if (typeof content === 'string') return false;

  if (content instanceof Blob) return false;

  if (isBytes(content)) return false;

  if (typeof ReadableStream !== 'undefined' && content instanceof ReadableStream) return true;

  return isAsyncIterable(content);
}

function escapeQuotes(value: string): string {
  return value.replace(/"/g, '%22');
}

function normalizeChunk(chunk: Uint8Array | string): Uint8Array {
  if (typeof chunk === 'string') {
    return textEncoder.encode(chunk);
  }

  return chunk;
}

async function* readableStreamToAsyncIterable(stream: ReadableStream<Uint8Array | string>): AsyncIterable<Uint8Array> {
  const reader = stream.getReader();
  try {
    for (;;) {
      const { value, done } = await reader.read();

      if (done) return;

      yield normalizeChunk(value);
    }
  } finally {
    reader.releaseLock();
  }
}

async function* contentToAsyncIterable(content: AttachmentContent): AsyncIterable<Uint8Array> {
  if (typeof content === 'string') {
    yield textEncoder.encode(content);

    return;
  }

  if (content instanceof Blob) {
    for await (const chunk of readableStreamToAsyncIterable(content.stream() as ReadableStream<Uint8Array>)) {
      yield chunk;
    }

    return;
  }

  if (isBytes(content)) {
    yield content;

    return;
  }

  if (typeof ReadableStream !== 'undefined' && content instanceof ReadableStream) {
    for await (const chunk of readableStreamToAsyncIterable(content as ReadableStream<Uint8Array | string>)) {
      yield chunk;
    }

    return;
  }

  if (isAsyncIterable(content)) {
    for await (const chunk of content) {
      yield normalizeChunk(chunk);
    }

    return;
  }

  throw new TypeError('Unsupported attachment content type');
}

function createBoundary(): string {
  const suffix =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().replace(/-/g, '')
      : `${Date.now()}${Math.random().toString(16).slice(2)}`;

  return `${PRODUCT_SLUG}-${suffix}`;
}

function toReadableStream(iterable: AsyncIterable<Uint8Array>): ReadableStream<Uint8Array> {
  const iterator = iterable[Symbol.asyncIterator]();

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();

        return;
      }

      controller.enqueue(value);
    },
    async cancel() {
      if (typeof iterator.return === 'function') {
        await iterator.return();
      }
    },
  });
}

async function* encodeMultipart(attachments: AttachmentInput[], boundary: string): AsyncIterable<Uint8Array> {
  for (const attachment of attachments) {
    // A Blob knows its own type; otherwise the filename is what we have.
    const contentType =
      attachment.content instanceof Blob && attachment.content.type
        ? attachment.content.type
        : mimeTypeFor(attachment.filename);

    const preamble = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${escapeQuotes(attachment.filename)}"\r\nContent-Type: ${contentType}\r\n\r\n`;
    yield textEncoder.encode(preamble);

    for await (const chunk of contentToAsyncIterable(attachment.content)) {
      yield chunk;
    }

    yield textEncoder.encode('\r\n');
  }

  yield textEncoder.encode(`--${boundary}--\r\n`);
}

/**
 * One {@link AttachmentInput} as a single `FormData`-appendable part.
 *
 * Multipart endpoints assemble their own `FormData` and append each attachment to it, so they need the content as one
 * value rather than as a whole encoded body — that is what this provides, and {@link createMultipartRequestBody} is the
 * streaming alternative for callers building a request by hand.
 *
 * Streaming content is collected here: a `FormData` part has to know its length, so a stream cannot stay lazy once it
 * goes into one.
 */
export async function toFormDataFile(attachment: AttachmentInput): Promise<Blob> {
  const { content } = attachment;

  if (content instanceof Blob) return content;

  // The filename is the only clue to the content type, and Atlassian decides
  // whether to preview or download based on what we send.
  const type = mimeTypeFor(attachment.filename);
  const chunks: Uint8Array[] = [];

  for await (const chunk of contentToAsyncIterable(content)) chunks.push(chunk);

  return new Blob(chunks as BlobPart[], { type });
}

/**
 * A multipart body for `input`, streaming it where the runtime allows.
 *
 * Content that is already in memory — a `File`, `Blob`, `Uint8Array` or string — goes into a `FormData`, which every
 * runtime handles and which lets the platform read a `File` off disk without loading it.
 *
 * Streaming content is sent as a stream where request streaming exists (Node, Chromium over HTTP/2) and is otherwise
 * collected into a `Blob` first, because Firefox and Safari cannot send a stream at all. Collecting is the fallback
 * rather than the default, so nothing silently buffers a large upload on a runtime that could have streamed it.
 */
export async function createMultipartRequestBody(
  input: AttachmentInput | AttachmentInput[],
): Promise<MultipartRequestBody> {
  const attachments = Array.isArray(input) ? input : [input];
  const hasStreamingInput = attachments.some(attachment => isStreamLikeContent(attachment.content));

  if (hasStreamingInput && supportsRequestStreaming()) {
    const boundary = createBoundary();

    return {
      body: toReadableStream(encodeMultipart(attachments, boundary)),
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
    };
  }

  const formData = new FormData();

  for (const attachment of attachments) {
    // Collapses a stream into a Blob when we got here by falling back; a no-op
    // for content that was already in memory.
    formData.append('file', await toFormDataFile(attachment), attachment.filename);
  }

  return { body: formData };
}
