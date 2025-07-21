import mime from 'mime';
import type { ReadableStream as ReadableNodeStream } from 'node:stream/web';

type FormDataValue = string | Blob | ArrayBuffer | ReadableStream | ReadableNodeStream;

class FileWithSize extends File {
  size: number = 0;
}

interface AppendOptions {
  contentLength?: number;
  contentType?: string;
}

export class FormDataService {
  formData: FormData;

  constructor() {
    this.formData = new FormData();
  }

  async append(value: FormDataValue, filename: string, options: AppendOptions = {}) {
    const blobOptions = {
      type: options.contentType ?? mime.getType(filename) ?? undefined,
    };

    if (typeof value === 'string') {
      this.formData.append('file', new Blob([value], blobOptions), filename);
    } else if (value instanceof Blob) {
      this.formData.append('file', new Blob([value], blobOptions), filename);
    } else if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer) {
      this.formData.append('file', new Blob([value], blobOptions), filename);
    } else if (value instanceof ReadableStream) {
      const file = new FileWithSize([], filename, blobOptions);

      if (options.contentLength != undefined) {
        file.size = options.contentLength;
        file.stream = () => value as ReadableStream;
      } else {
        const [streamForSize, streamForContent] = value.tee();

        file.size = await this.getStreamSize(streamForSize);
        file.stream = () => streamForContent as ReadableStream;
      }

      this.formData.append('file', file);
    } else {
      throw new Error('Invalid value'); // todo
    }
  }

  private async getStreamSize(stream: ReadableStream | ReadableNodeStream): Promise<number> {
    let totalSize = 0;
    const reader = stream.getReader();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      if (value instanceof Uint8Array) {
        totalSize += value.length;
      } else if (typeof value === 'string') {
        totalSize += new TextEncoder().encode(value).length;
      } else if (value instanceof Blob) {
        totalSize += value.size;
      } else if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer) {
        totalSize += value.byteLength;
      } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {
        totalSize += value.length;
      } else if (value === null || value === undefined) {
        continue;
      } else {
        throw new Error(`Unsupported value type: ${typeof value}`);
      }
    }

    return totalSize;
  }
}
