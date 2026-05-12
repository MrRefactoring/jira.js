import { describe, expect, it } from 'vitest';
import { createMultipartRequestBody } from '../../../src/formData/multipartRequest';

describe('createMultipartRequestBody', () => {
  it('uses FormData for non-streaming attachments', () => {
    const { body, headers } = createMultipartRequestBody({ filename: 'a.txt', content: 'hello' });
    expect(body instanceof FormData).toBe(true);
    expect(headers).toBeUndefined();
  });

  it('builds streaming multipart for async iterable attachments lazily', async () => {
    let consumed = 0;
    const stream = {
      async *[Symbol.asyncIterator](): AsyncIterableIterator<string> {
        consumed += 1;
        yield 'chunk-1';
        consumed += 1;
        yield 'chunk-2';
      },
    };

    const { body, headers } = createMultipartRequestBody({ filename: 'big.bin', content: stream });

    expect(headers?.['Content-Type']).toMatch(/^multipart\/form-data; boundary=/);
    expect(consumed).toBe(0);

    if (body instanceof FormData) {
      throw new Error('Expected streaming body, got FormData');
    }

    const iterator = (body as AsyncIterable<Uint8Array>)[Symbol.asyncIterator]();
    const first = await iterator.next();
    expect(first.done).toBe(false);
    expect(consumed).toBe(0);

    await iterator.next();
    expect(consumed).toBeGreaterThan(0);
  });
});
