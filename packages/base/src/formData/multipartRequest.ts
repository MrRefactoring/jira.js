import type { AttachmentInput, AttachmentContent } from './attachmentInput';

export type MultipartRequestBody = {
  body: FormData | AsyncIterable<Uint8Array> | ReadableStream<Uint8Array>;
  headers?: Record<string, string>;
};

const textEncoder = new TextEncoder();

function isNodeRuntime(): boolean {
  return typeof process !== 'undefined' && !!process.versions.node;
}

function isAsyncIterable(value: unknown): value is AsyncIterable<Uint8Array | string> {
  if (value == null) return false;

  return typeof (value as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] === 'function';
}

function isStreamLikeContent(content: AttachmentContent): boolean {
  if (typeof content === 'string') return false;

  if (content instanceof Blob) return false;

  if (typeof Buffer !== 'undefined' && content instanceof Buffer) return false;

  if (typeof ReadableStream !== 'undefined' && content instanceof ReadableStream) return true;

  return isAsyncIterable(content);
}

function toFormDataPart(content: AttachmentContent): Blob {
  if (typeof content === 'string') {
    return new Blob([content], { type: 'text/plain; charset=utf-8' });
  }

  if (content instanceof Blob) {
    return content;
  }

  if (typeof Buffer !== 'undefined' && content instanceof Buffer) {
    return new Blob([new Uint8Array(content)], { type: 'application/octet-stream' });
  }

  throw new TypeError('Streaming attachment content requires streaming multipart mode');
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

  if (typeof Buffer !== 'undefined' && content instanceof Buffer) {
    yield new Uint8Array(content);

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

  return `jira-js-${suffix}`;
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
    const contentType =
      typeof attachment.content === 'string'
        ? 'text/plain; charset=utf-8'
        : attachment.content instanceof Blob && attachment.content.type
          ? attachment.content.type
          : 'application/octet-stream';

    const preamble = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${escapeQuotes(attachment.filename)}"\r\nContent-Type: ${contentType}\r\n\r\n`;
    yield textEncoder.encode(preamble);

    for await (const chunk of contentToAsyncIterable(attachment.content)) {
      yield chunk;
    }

    yield textEncoder.encode('\r\n');
  }

  yield textEncoder.encode(`--${boundary}--\r\n`);
}

export function createMultipartRequestBody(input: AttachmentInput | AttachmentInput[]): MultipartRequestBody {
  const attachments = Array.isArray(input) ? input : [input];
  const hasStreamingInput = attachments.some(attachment => isStreamLikeContent(attachment.content));

  if (!hasStreamingInput && typeof FormData !== 'undefined') {
    const formData = new FormData();

    for (const attachment of attachments) {
      formData.append('file', toFormDataPart(attachment.content), attachment.filename);
    }

    return { body: formData };
  }

  const boundary = createBoundary();
  const iterable = encodeMultipart(attachments, boundary);

  if (isNodeRuntime()) {
    return {
      body: iterable,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
    };
  }

  return {
    body: toReadableStream(iterable),
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
    },
  };
}
