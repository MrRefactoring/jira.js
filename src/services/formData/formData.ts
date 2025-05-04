type FormDataPart = {
  name: string;
  value: string | Blob | File | NodeJS.ReadableStream | Buffer | ArrayBuffer;
  filename?: string;
  contentType?: string;
};

export class FormDataBuilder {
  private boundary: string;
  private parts: FormDataPart[];
  private headers: Record<string, string>;

  constructor() {
    this.boundary = `----WebKitFormBoundary${Math.random().toString(16).substr(2)}`;
    this.parts = [];
    this.headers = {
      'Content-Type': `multipart/form-data; boundary=${this.boundary}`,
    };
  }

  append(
    name: string,
    value: string | Blob | File | NodeJS.ReadableStream | Buffer | ArrayBuffer,
    filename?: string,
    contentType?: string
  ): void {
    this.parts.push({
      name,
      value,
      filename,
      contentType: contentType || (filename ? 'application/octet-stream' : 'text/plain'),
    });
  }

  getHeaders(): Record<string, string> {
    return this.headers;
  }

  async *stream(): AsyncGenerator<Uint8Array | Buffer | string, void, unknown> {
    const encoder = new TextEncoder();

    for (const part of this.parts) {
      yield encoder.encode(`--${this.boundary}\r\n`);
      yield encoder.encode(`Content-Disposition: form-data; name="${part.name}"`);

      if (part.filename) {
        yield encoder.encode(`; filename="${part.filename}"\r\n`);
      } else {
        yield encoder.encode('\r\n');
      }

      if (part.contentType) {
        yield encoder.encode(`Content-Type: ${part.contentType}\r\n\r\n`);
      } else {
        yield encoder.encode('\r\n');
      }

      // Handle different value types
      if (typeof part.value === 'string') {
        yield encoder.encode(part.value);
      } else if (isBlob(part.value)) {
        // Browser: Stream the Blob/File
        const reader = part.value.stream().getReader();
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          yield value;
        }
      } else if (isNodeReadableStream(part.value)) {
        // Node.js: Stream the readable stream
        for await (const chunk of part.value) {
          yield chunk as Buffer;
        }
      } else {
        // @ts-expect-error asd
        yield part.value as Buffer | ArrayBuffer;
      }

      yield encoder.encode('\r\n');
    }

    // End boundary
    yield encoder.encode(`--${this.boundary}--\r\n`);
  }

  async getBody(): Promise<Uint8Array> {
    const chunks: Uint8Array[] = [];
    for await (const chunk of this.stream()) {
      if (typeof chunk === 'string') {
        chunks.push(new TextEncoder().encode(chunk));
      } else if (chunk instanceof ArrayBuffer) {
        chunks.push(new Uint8Array(chunk));
      } else {
        chunks.push(chunk);
      }
    }

    return concatenateUint8Arrays(chunks);
  }
}

// Type guards
function isBlob(value: unknown): value is Blob {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

function isNodeReadableStream(value: unknown): value is NodeJS.ReadableStream {
  return typeof process !== 'undefined' &&
    // @ts-expect-error asd
    typeof NodeJS !== 'undefined' &&
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    value instanceof require('stream').Readable;
}

// Helper function to concatenate Uint8Arrays
function concatenateUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((acc, value) => acc + value.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}
