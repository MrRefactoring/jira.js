import { describe, expect, it, vi } from 'vitest';
import { createMultipartRequestBody, toFormDataFile } from '#/core';

async function partText(body: FormData): Promise<string> {
  const part = body.get('file');

  return part instanceof Blob ? part.text() : String(part);
}

function streamOf(...chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
}

describe('attachment content shapes', () => {
  it.each([
    ['string', 'plain text'],
    ['Uint8Array', new TextEncoder().encode('plain text')],
    ['Buffer', Buffer.from('plain text')],
    ['Buffer subarray with a byteOffset', Buffer.from('xxplain textx').subarray(2, 12)],
    ['Blob', new Blob(['plain text'])],
    ['File', new File(['plain text'], 'a.txt')],
  ])('accepts %s', async (_label, content) => {
    const blob = await toFormDataFile({ filename: 'a.txt', content: content as never });

    expect(await blob.text()).toBe('plain text');
  });

  it('accepts an async iterable, which is what a Node Readable is', async () => {
    async function* chunks(): AsyncIterable<string> {
      yield 'plain ';
      yield 'text';
    }

    const blob = await toFormDataFile({ filename: 'a.txt', content: chunks() });

    expect(await blob.text()).toBe('plain text');
  });
});

describe('createMultipartRequestBody', () => {
  it('puts in-memory content into FormData, which every runtime can send', async () => {
    const { body, headers } = await createMultipartRequestBody({ filename: 'a.txt', content: 'hello' });

    expect(body).toBeInstanceOf(FormData);
    expect(headers).toBeUndefined();
    expect(await partText(body as FormData)).toBe('hello');
  });

  it('streams a stream on a runtime that supports it, with its own boundary', async () => {
    const { body, headers } = await createMultipartRequestBody({ filename: 'a.txt', content: streamOf('hello') });

    expect(body).toBeInstanceOf(ReadableStream);
    expect(headers?.['Content-Type']).toMatch(/^multipart\/form-data; boundary=jira-js-/);
  });

  it('encodes the multipart envelope around the streamed content', async () => {
    const { body, headers } = await createMultipartRequestBody({ filename: 'note.txt', content: streamOf('hi') });

    const text = await new Response(body as ReadableStream).text();
    const boundary = headers!['Content-Type'].split('boundary=')[1];

    expect(text).toContain(`--${boundary}\r\n`);
    expect(text).toContain('Content-Disposition: form-data; name="file"; filename="note.txt"');
    expect(text).toContain('\r\n\r\nhi\r\n');
    expect(text.endsWith(`--${boundary}--\r\n`)).toBe(true);
  });

  it('escapes a quote in the filename rather than breaking out of the header', async () => {
    const { body } = await createMultipartRequestBody({ filename: 'a".txt', content: streamOf('x') });
    const text = await new Response(body as ReadableStream).text();

    expect(text).toContain('filename="a%22.txt"');
  });

  it('keeps several attachments in one body', async () => {
    const { body } = await createMultipartRequestBody([
      { filename: 'a.txt', content: streamOf('one') },
      { filename: 'b.txt', content: streamOf('two') },
    ]);

    const text = await new Response(body as ReadableStream).text();

    expect(text).toContain('filename="a.txt"');
    expect(text).toContain('filename="b.txt"');
  });

  it('falls back to FormData when the runtime cannot stream a request body', async () => {
    const original = globalThis.Request;

    class NoStreamRequest {
      constructor(_url: string, init: RequestInit) {
        void init.body;
      }
    }

    globalThis.Request = NoStreamRequest as unknown as typeof Request;

    try {
      vi.resetModules();

      const fresh = await import('#/core/formData/multipartRequest');
      const { body } = await fresh.createMultipartRequestBody({ filename: 'a.txt', content: streamOf('hello') });

      expect(body).toBeInstanceOf(FormData);
      expect(await partText(body as FormData)).toBe('hello');
    } finally {
      globalThis.Request = original;
      vi.resetModules();
    }
  });
});
