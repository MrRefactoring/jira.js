import { Readable } from 'node:stream';
import { describe, expect, it, vi } from 'vitest';
import {
  addAttachment,
  getAttachment,
  getAttachmentContent,
  getAttachmentMeta,
  getAttachmentThumbnail,
  removeAttachment,
} from '../../src/api/issueAttachments';

type CapturedCall = {
  url: string;
  method: string;
  headers?: Record<string, string>;
  searchParams?: Record<string, unknown>;
  body?: unknown;
  schema?: { parse: (input: unknown) => unknown };
};

function createClientMock(response: unknown) {
  const calls: CapturedCall[] = [];
  const sendRequest = vi.fn(async (config: CapturedCall) => {
    calls.push(config);
    return response;
  });
  return {
    client: { sendRequest },
    calls,
    sendRequest,
  };
}

describe('issueAttachments api module', () => {
  describe('getAttachmentContent', () => {
    it('builds attachment content request with redirect param and binary schema', async () => {
      const payload = new Uint8Array([1, 2, 3]);
      const { client, calls } = createClientMock(payload);

      const result = await getAttachmentContent(client as never, { id: '101', redirect: false });

      expect(result).toBe(payload);
      expect(calls).toHaveLength(1);
      expect(calls[0]?.url).toBe('/rest/api/3/attachment/content/101');
      expect(calls[0]?.method).toBe('GET');
      expect(calls[0]?.searchParams).toEqual({ redirect: false });
      expect(calls[0]?.schema?.parse(payload)).toBe(payload);
    });
  });

  describe('getAttachmentMeta', () => {
    it('builds attachment meta request and validates schema shape', async () => {
      const payload = { enabled: true, uploadLimit: 1000 };
      const { client, calls } = createClientMock(payload);

      const result = await getAttachmentMeta(client as never);

      expect(result).toBe(payload);
      expect(calls).toHaveLength(1);
      expect(calls[0]?.url).toBe('/rest/api/3/attachment/meta');
      expect(calls[0]?.method).toBe('GET');
      expect(calls[0]?.schema?.parse(payload)).toEqual(payload);
    });

    it('schema rejects malformed attachment meta response', async () => {
      const { client, calls } = createClientMock(undefined);
      await getAttachmentMeta(client as never);
      expect(() => calls[0]?.schema?.parse({ enabled: 'true' })).toThrow();
    });
  });

  describe('getAttachmentThumbnail', () => {
    it('builds thumbnail request with all query params', async () => {
      const payload = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);
      const { client, calls } = createClientMock(payload);

      const result = await getAttachmentThumbnail(client as never, {
        id: '55',
        redirect: true,
        fallbackToDefault: true,
        width: 128,
        height: 64,
      });

      expect(result).toBe(payload);
      expect(calls).toHaveLength(1);
      expect(calls[0]?.url).toBe('/rest/api/3/attachment/thumbnail/55');
      expect(calls[0]?.method).toBe('GET');
      expect(calls[0]?.searchParams).toEqual({
        redirect: true,
        fallbackToDefault: true,
        width: 128,
        height: 64,
      });
      expect(calls[0]?.schema?.parse(payload)).toBe(payload);
    });
  });

  describe('getAttachment', () => {
    it('builds metadata request and parses attachment metadata schema', async () => {
      const payload = {
        id: 77,
        filename: 'пример.txt',
        mimeType: 'text/plain',
        size: 12,
        created: '2026-05-07T17:00:00.000Z',
        author: { accountId: 'abc' },
      };
      const { client, calls } = createClientMock(payload);

      const result = await getAttachment(client as never, { id: '77' });

      expect(result).toBe(payload);
      expect(calls).toHaveLength(1);
      expect(calls[0]?.url).toBe('/rest/api/3/attachment/77');
      expect(calls[0]?.method).toBe('GET');
      const parsed = calls[0]?.schema?.parse(payload) as { created?: Date; filename?: string };
      expect(parsed.filename).toBe('пример.txt');
      expect(parsed.created).toBeInstanceOf(Date);
    });
  });

  describe('removeAttachment', () => {
    it('builds delete request for attachment id', async () => {
      const { client, calls } = createClientMock(undefined);

      const result = await removeAttachment(client as never, { id: '999' });

      expect(result).toBeUndefined();
      expect(calls).toHaveLength(1);
      expect(calls[0]?.url).toBe('/rest/api/3/attachment/999');
      expect(calls[0]?.method).toBe('DELETE');
    });
  });

  describe('addAttachment', () => {
    it('creates multipart request with atl-token header', async () => {
      const response = [{ id: '1', filename: 'a.txt', size: 1 }];
      const { client, calls } = createClientMock(response);
      const content = Buffer.from('A');

      const result = await addAttachment(client as never, {
        issueIdOrKey: 'PROJ-1',
        attachments: { filename: 'a.txt', content },
      });

      expect(result).toBe(response);
      expect(calls).toHaveLength(1);
      expect(calls[0]?.url).toBe('/rest/api/3/issue/PROJ-1/attachments');
      expect(calls[0]?.method).toBe('POST');
      expect(calls[0]?.headers).toEqual({ 'X-Atlassian-Token': 'no-check' });
      expect(calls[0]?.body).toBeInstanceOf(FormData);
    });

    it('supports array uploads and preserves duplicate filenames', async () => {
      const { client, calls } = createClientMock([]);
      await addAttachment(client as never, {
        issueIdOrKey: 'PROJ-2',
        attachments: [
          { filename: 'dup.txt', content: 'one' },
          { filename: 'dup.txt', content: 'two' },
        ],
      });
      const formData = calls[0]?.body as FormData;
      const parts = formData.getAll('file');
      expect(parts).toHaveLength(2);
    });

    it('does not consume async iterable before sending request', async () => {
      let chunksRequested = 0;
      const content = new Readable({
        read() {
          chunksRequested += 1;
          if (chunksRequested <= 3) this.push(Buffer.alloc(1024, chunksRequested));
          else this.push(null);
        },
      });
      let capturedBody: unknown;
      const client = {
        sendRequest: vi.fn(async (config: CapturedCall) => {
          capturedBody = config.body;
          return config;
        }),
      };

      await addAttachment(client as never, {
        issueIdOrKey: 'PROJ-3',
        attachments: { filename: 'stream.bin', content },
      });

      expect(chunksRequested).toBe(0);
      const iterator = (capturedBody as AsyncIterable<Uint8Array>)[Symbol.asyncIterator]();
      for (let i = 0; i < 6 && chunksRequested === 0; i += 1) {
        await iterator.next();
      }
      expect(chunksRequested).toBeGreaterThan(0);
    });

    it('throws for unsupported content types', async () => {
      const { client } = createClientMock([]);
      await expect(
        addAttachment(client as never, {
          issueIdOrKey: 'PROJ-4',
          attachments: { filename: 'bad.bin', content: new Uint8Array([1, 2, 3]) as never },
        }),
      ).rejects.toThrow(TypeError);
    });
  });
});
