import { afterEach, describe, expect, it, vi } from 'vitest';
import { createCloudClient } from '../../src/createCloudClient';

describe('issueAttachments client interop', () => {
  const host = 'https://example.atlassian.net';
  const auth = { type: 'basic' as const, email: 'a@b.c', apiToken: 'token' };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns undefined for getAttachmentContent due to non-json short-circuit', async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(new Uint8Array([1, 2, 3]), {
        status: 200,
        headers: { 'content-type': 'application/octet-stream' },
      });
    });
    vi.stubGlobal('fetch', fetchMock);
    const client = createCloudClient({ host, auth });

    const result = await client.issueAttachments.getAttachmentContent({ id: '12', redirect: false });

    expect(result).toBeUndefined();
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('returns undefined for getAttachmentThumbnail due to non-json short-circuit', async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(new Uint8Array([0x89, 0x50, 0x4e, 0x47]), {
        status: 200,
        headers: { 'content-type': 'image/png' },
      });
    });
    vi.stubGlobal('fetch', fetchMock);
    const client = createCloudClient({ host, auth });

    const result = await client.issueAttachments.getAttachmentThumbnail({
      id: '33',
      width: 16,
      height: 16,
      fallbackToDefault: true,
      redirect: false,
    });

    expect(result).toBeUndefined();
  });

  it('surfaces schema parse errors for malformed getAttachmentMeta payloads', async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({ enabled: 'yes' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    });
    vi.stubGlobal('fetch', fetchMock);
    const client = createCloudClient({ host, auth });

    await expect(client.issueAttachments.getAttachmentMeta()).rejects.toThrow();
  });

  it('passes FormData body for addAttachment without forcing json content-type', async () => {
    const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
      const headers = init?.headers as Record<string, string> | undefined;
      expect(headers?.['Content-Type']).toBeUndefined();
      expect(init?.body).toBeInstanceOf(FormData);
      return new Response(JSON.stringify([{ id: '10', filename: 'x.txt', size: 1 }]), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    });
    vi.stubGlobal('fetch', fetchMock);
    const client = createCloudClient({ host, auth });

    const result = await client.issueAttachments.addAttachment({
      issueIdOrKey: 'PROJ-1',
      attachments: { filename: 'x.txt', content: 'x' },
    });

    expect(result[0]?.id).toBe('10');
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
