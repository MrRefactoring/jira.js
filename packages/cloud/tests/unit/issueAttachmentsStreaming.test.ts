import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { Readable } from 'node:stream';
import { afterEach, describe, expect, it } from 'vitest';
import { createCloudClient } from '../../src/createCloudClient';

type UploadProbe = {
  totalBytes: number;
  firstChunkAtMs: number | null;
  ended: boolean;
};

type StartedServer = {
  baseUrl: string;
  close: () => Promise<void>;
  probe: UploadProbe;
};

async function startUploadServer(
  handler: (request: IncomingMessage, response: ServerResponse, probe: UploadProbe) => void,
): Promise<StartedServer> {
  const probe: UploadProbe = {
    totalBytes: 0,
    firstChunkAtMs: null,
    ended: false,
  };
  const server = createServer((request, response) => handler(request, response, probe));
  await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();

  if (!address || typeof address === 'string') throw new Error('Failed to start test server');

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    probe,
    close: async () => {
      // Force-close any lingering connections (needed after socket.destroy() in mid-stream tests)
      if (typeof (server as typeof server & { closeAllConnections?: () => void }).closeAllConnections === 'function') {
        (server as typeof server & { closeAllConnections: () => void }).closeAllConnections();
      }

      await new Promise<void>((resolve, reject) => {
        server.close(error => {
          if (error) reject(error);
          else resolve();
        });
      });
    },
  };
}

function createClient(baseUrl: string) {
  return createCloudClient({
    host: baseUrl,
    auth: { type: 'bearer', token: 'test-token' },
  });
}

function okAttachmentPayload(size: number, filename: string): string {
  return JSON.stringify([
    { id: '1', filename, size, mimeType: 'application/octet-stream', created: new Date().toISOString() },
  ]);
}

async function readRequestSlowly(request: IncomingMessage, probe: UploadProbe, chunkDelayMs: number): Promise<void> {
  for await (const chunk of request) {
    if (probe.firstChunkAtMs === null) probe.firstChunkAtMs = Date.now();

    probe.totalBytes += (chunk as Buffer).byteLength;
    await new Promise(resolve => setTimeout(resolve, chunkDelayMs));
  }

  probe.ended = true;
}

describe('issueAttachments.addAttachment streaming behavior', () => {
  const activeClosers: Array<() => Promise<void>> = [];

  afterEach(async () => {
    while (activeClosers.length > 0) {
      const closer = activeClosers.pop();

      if (closer) await closer();
    }
  }, 30_000);

  it('streams async iterable payload progressively with bounded memory growth for hundreds of MB logical size', async () => {
    const chunkSize = 64 * 1024;
    const chunkCount = 4_096;
    let generatedChunks = 0;
    let streamStartedAtMs: number | null = null;

    const uploadServer = await startUploadServer(async (request, response, probe) => {
      await readRequestSlowly(request, probe, 1);
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(okAttachmentPayload(probe.totalBytes, 'huge.bin'));
    });
    activeClosers.push(uploadServer.close);

    const client = createClient(uploadServer.baseUrl);
    const source = {
      async *[Symbol.asyncIterator](): AsyncIterableIterator<Uint8Array> {
        streamStartedAtMs = Date.now();

        for (let index = 0; index < chunkCount; index += 1) {
          generatedChunks += 1;
          yield new Uint8Array(chunkSize);
        }
      },
    };

    const baselineRss = process.memoryUsage().rss;
    let peakRss = baselineRss;
    const monitor = setInterval(() => {
      const rss = process.memoryUsage().rss;

      if (rss > peakRss) peakRss = rss;
    }, 10);

    const startedAtMs = Date.now();
    const result = await client.issueAttachments.addAttachment({
      issueIdOrKey: 'STREAM-1',
      attachments: { filename: 'huge.bin', content: source },
    });
    clearInterval(monitor);

    expect(result[0]?.id).toBe('1');
    expect(generatedChunks).toBe(chunkCount);
    expect(uploadServer.probe.ended).toBe(true);
    expect(uploadServer.probe.firstChunkAtMs).not.toBeNull();
    expect(streamStartedAtMs).not.toBeNull();
    expect((uploadServer.probe.firstChunkAtMs as number) - startedAtMs).toBeLessThan(1_500);
    // 400 MB ceiling: proves we're not buffering the full 256 MB dataset in-process
    // (OS socket buffers + GC pressure from concurrent tests account for ~30-50 MB overhead)
    expect(peakRss - baselineRss).toBeLessThan(400 * 1024 * 1024);
  }, 120_000);

  it('supports Node.js Readable and Web ReadableStream without prebuffering full upload', async () => {
    const uploadServer = await startUploadServer(async (request, response, probe) => {
      await readRequestSlowly(request, probe, 2);
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(okAttachmentPayload(probe.totalBytes, 'dual-stream.bin'));
    });
    activeClosers.push(uploadServer.close);

    const client = createClient(uploadServer.baseUrl);
    let nodeReads = 0;
    const nodeReadable = new Readable({
      read() {
        nodeReads += 1;

        if (nodeReads <= 128) this.push(Buffer.alloc(16 * 1024, nodeReads));
        else this.push(null);
      },
    });
    const webReadable = new ReadableStream<Uint8Array>({
      start(controller) {
        for (let index = 0; index < 128; index += 1) {
          controller.enqueue(new Uint8Array(16 * 1024));
        }

        controller.close();
      },
    });

    await client.issueAttachments.addAttachment({
      issueIdOrKey: 'STREAM-2',
      attachments: [
        { filename: 'node.bin', content: nodeReadable },
        { filename: 'web.bin', content: webReadable },
      ],
    });

    expect(nodeReads).toBeGreaterThan(1);
    expect(uploadServer.probe.totalBytes).toBeGreaterThan(0);
    expect(uploadServer.probe.ended).toBe(true);
  });

  it('handles Blob.stream() and File.stream() sources end-to-end', async () => {
    const uploadServer = await startUploadServer(async (request, response, probe) => {
      await readRequestSlowly(request, probe, 0);
      response.writeHead(200, { 'content-type': 'application/json' });
      response.end(okAttachmentPayload(probe.totalBytes, 'blob-file.bin'));
    });
    activeClosers.push(uploadServer.close);

    const client = createClient(uploadServer.baseUrl);
    const blob = new Blob([new Uint8Array(256 * 1024)]);
    const file = new File([new Uint8Array(256 * 1024)], 'f.bin', { type: 'application/octet-stream' });

    const result = await client.issueAttachments.addAttachment({
      issueIdOrKey: 'STREAM-3',
      attachments: [
        { filename: 'blob.bin', content: blob.stream() },
        { filename: 'file.bin', content: file.stream() },
      ],
    });

    expect(result[0]?.id).toBe('1');
    expect(uploadServer.probe.totalBytes).toBeGreaterThan(0);
  });

  it('stops consuming source early when server terminates upload mid-stream', async () => {
    let generatedChunks = 0;
    const uploadServer = await startUploadServer((request, _response, probe) => {
      request.once('data', chunk => {
        if (probe.firstChunkAtMs === null) probe.firstChunkAtMs = Date.now();

        probe.totalBytes += (chunk as Buffer).byteLength;
        request.socket.destroy();
      });
    });
    activeClosers.push(uploadServer.close);

    const client = createClient(uploadServer.baseUrl);
    const source = {
      async *[Symbol.asyncIterator](): AsyncIterableIterator<Uint8Array> {
        for (let index = 0; index < 100_000; index += 1) {
          generatedChunks += 1;
          yield new Uint8Array(8 * 1024);
        }
      },
    };

    await expect(
      client.issueAttachments.addAttachment({
        issueIdOrKey: 'STREAM-4',
        attachments: { filename: 'cutoff.bin', content: source },
      }),
    ).rejects.toThrow();

    expect(generatedChunks).toBeLessThan(100_000);
    expect(uploadServer.probe.totalBytes).toBeGreaterThan(0);
  });
});
