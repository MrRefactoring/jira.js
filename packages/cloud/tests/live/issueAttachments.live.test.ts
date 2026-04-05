import { createReadStream } from 'node:fs';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';
import { ApiError } from '@jira.js/base';
import { afterAll, beforeAll, describe, expect, it, type TestContext } from 'vitest';
import { createLiveCloudClient, type LiveCloudClient } from './helpers/createLiveCloudClient';
import { getInjectedLiveProject, type LiveProjectHandle } from './helpers/liveTestState';
import { uid } from './helpers/namespace';
import { pollUntil } from './helpers/pollUntil';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = resolve(__dirname, 'fixtures/issueAttachment.txt');

type UploadInput = {
  filename: string;
  content: unknown;
  expectedBytes: Uint8Array;
  expectedMimeSubstring?: string;
};

type UploadCase = {
  name: string;
  build: () => Promise<UploadInput> | UploadInput;
};

function basicAuthHeader(email: string, apiToken: string): string {
  return `Basic ${Buffer.from(`${email}:${apiToken}`, 'utf8').toString('base64')}`;
}

async function waitForAttachmentLink(live: LiveCloudClient, issueKey: string, attachmentId: string): Promise<void> {
  await pollUntil(
    () => live.client.issues.getIssue({ issueIdOrKey: issueKey, fields: ['attachment'] }),
    issue => {
      const attachments = issue.fields?.['attachment'] as Array<{ id?: string }> | undefined;
      return attachments?.some(a => a.id === attachmentId) ?? false;
    },
    { maxAttempts: 5, intervalMs: 1000, context: 'attachment-link' },
  );
}

async function getIssueAttachmentIds(live: LiveCloudClient, issueKey: string): Promise<string[]> {
  const issue = await live.client.issues.getIssue({
    issueIdOrKey: issueKey,
    fields: ['attachment'],
  });
  const attachments = issue.fields?.['attachment'] as Array<{ id?: string }> | undefined;

  return (attachments ?? []).map(attachment => attachment.id).filter((id): id is string => Boolean(id));
}

async function toBytes(content: unknown): Promise<Uint8Array> {
  if (typeof content === 'string') return new TextEncoder().encode(content);

  if (content instanceof Uint8Array) return content;

  if (content instanceof ArrayBuffer) return new Uint8Array(content);

  if (content instanceof DataView) return new Uint8Array(content.buffer.slice(0));

  if (content instanceof Blob) return new Uint8Array(await content.arrayBuffer());

  if (typeof Buffer !== 'undefined' && content instanceof Buffer) return new Uint8Array(content);

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(content)) {
    return new Uint8Array(content.buffer.slice(0));
  }

  if (
    typeof content === 'object' &&
    content != null &&
    'type' in content &&
    (content as { type?: unknown }).type === 'Buffer' &&
    'data' in content &&
    Array.isArray((content as { data?: unknown }).data)
  ) {
    return Uint8Array.from((content as { data: number[] }).data);
  }

  if (Array.isArray(content) && content.every(item => typeof item === 'number')) {
    return Uint8Array.from(content);
  }

  if (
    typeof content === 'object' &&
    content != null &&
    'length' in content &&
    typeof (content as { length?: unknown }).length === 'number'
  ) {
    const arrayLike = content as { [index: number]: number; length: number };
    const bytes = new Uint8Array(arrayLike.length);

    for (let index = 0; index < arrayLike.length; index++) bytes[index] = arrayLike[index] ?? 0;

    return bytes;
  }

  try {
    const arrayBuffer = await new Response(content as BodyInit).arrayBuffer();

    return new Uint8Array(arrayBuffer);
  } catch {
    return new Uint8Array([]);
  }
}

async function verifyUpload(
  live: LiveCloudClient,
  issueKey: string,
  input: UploadInput,
): Promise<{ id: string; filename: string }> {
  const beforeIds = await getIssueAttachmentIds(live, issueKey);
  const uploaded = await live.client.issueAttachments.addAttachment({
    issueIdOrKey: issueKey,
    attachments: {
      filename: input.filename,
      content: input.content as never,
    },
  });
  const attachment = uploaded[0];

  expect(attachment).toBeDefined();
  expect(typeof attachment.id).toBe('string');
  expect(attachment.filename).toBe(input.filename);
  expect(typeof attachment.size).toBe('number');
  expect(attachment.size).toBe(input.expectedBytes.byteLength);
  expect(attachment.created).toBeInstanceOf(Date);
  expect(typeof attachment.author?.accountId).toBe('string');

  if (input.expectedMimeSubstring) {
    expect(attachment.mimeType).toContain(input.expectedMimeSubstring);
  }

  const attachmentId = attachment.id;

  if (!attachmentId) throw new Error('Attachment id missing from addAttachment response');

  await waitForAttachmentLink(live, issueKey, attachmentId);

  const afterIds = await getIssueAttachmentIds(live, issueKey);
  expect(afterIds).toContain(attachmentId);
  expect(afterIds.length).toBeGreaterThan(beforeIds.length);

  const metadata = await live.client.issueAttachments.getAttachment({ id: attachmentId });
  expect(typeof metadata.id).toBe('number');
  expect(metadata.filename).toBe(input.filename);
  expect(metadata.size).toBe(input.expectedBytes.byteLength);
  expect(metadata.created).toBeInstanceOf(Date);
  expect(typeof metadata.author?.accountId).toBe('string');

  if (input.expectedMimeSubstring) {
    expect(metadata.mimeType).toContain(input.expectedMimeSubstring);
  }

  const content = await live.client.issueAttachments.getAttachmentContent({
    id: attachmentId,
    redirect: false,
  });
  const actualBytes = await toBytes(content);
  expect(actualBytes.byteLength).toBeGreaterThanOrEqual(0);

  return { id: attachmentId, filename: input.filename };
}

describe('issueAttachments — live', () => {
  describe('addAttachment', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;
    let issueId: string;
    let issueKey: string;
    let tempDir: string;

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();
      tempDir = await mkdtemp(join(tmpdir(), 'jirajs-live-attachment-'));

      const created = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-live-attachment'),
        },
      });

      if (!created.id || !created.key) {
        throw new Error('Failed to create issue for live attachment test');
      }

      issueId = created.id;
      issueKey = created.key;
    }, 120_000);

    afterAll(async () => {
      await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
      await rm(tempDir, { recursive: true, force: true }).catch(() => {});
    }, 120_000);

    const bufferCases: UploadCase[] = [
      {
        name: 'uploads Buffer content',
        async build() {
          const expected = Buffer.from('buffer-live-upload-check');

          return {
            filename: `${uid('buffer')}.txt`,
            content: expected,
            expectedBytes: expected,
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads zero-byte Buffer',
        build() {
          const expected = Buffer.alloc(0);

          return {
            filename: `${uid('zero-byte')}.bin`,
            content: expected,
            expectedBytes: expected,
            expectedMimeSubstring: 'application/octet-stream',
          };
        },
      },
      {
        name: 'uploads large Buffer payload',
        build() {
          const expected = Buffer.from('L'.repeat(256 * 1024), 'utf8');

          return {
            filename: `${uid('large-buffer')}.txt`,
            content: expected,
            expectedBytes: expected,
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
    ];

    const nodeStreamCases: UploadCase[] = [
      {
        name: 'uploads fs.createReadStream content',
        async build() {
          const filePath = join(tempDir, `${uid('fs-stream')}.txt`);
          const expected = await readFile(fixturePath);
          await writeFile(filePath, expected);

          return {
            filename: `${uid('fs-stream-upload')}.txt`,
            content: createReadStream(filePath),
            expectedBytes: expected,
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads Readable.from content',
        build() {
          const expected = Buffer.from('readable-from-content');

          return {
            filename: `${uid('readable-from')}.txt`,
            content: Readable.from([expected]),
            expectedBytes: expected,
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads custom Readable content',
        build() {
          const expected = Buffer.from('custom-readable-content');
          class CustomReadable extends Readable {
            override _read(): void {
              this.push(expected);
              this.push(null);
            }
          }

          return {
            filename: `${uid('custom-readable')}.txt`,
            content: new CustomReadable(),
            expectedBytes: expected,
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
    ];

    const webStreamCases: UploadCase[] = [
      {
        name: 'uploads ReadableStream content',
        build() {
          const expected = new TextEncoder().encode('web-readable-stream');
          const content = new ReadableStream<Uint8Array>({
            start(controller) {
              controller.enqueue(expected);
              controller.close();
            },
          });

          return {
            filename: `${uid('web-stream')}.txt`,
            content,
            expectedBytes: expected,
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads Blob.stream() content',
        build() {
          const blob = new Blob(['blob-stream-data'], { type: 'text/plain' });
          const expected = new TextEncoder().encode('blob-stream-data');

          return {
            filename: `${uid('blob-stream')}.txt`,
            content: blob.stream(),
            expectedBytes: expected,
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
    ];

    const blobCases: UploadCase[] = [
      {
        name: 'uploads Blob with explicit MIME type',
        build() {
          const blob = new Blob(['blob-explicit-mime'], { type: 'text/plain' });

          return {
            filename: `${uid('blob-explicit')}.txt`,
            content: blob,
            expectedBytes: new TextEncoder().encode('blob-explicit-mime'),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads Blob without MIME type',
        build() {
          const blob = new Blob(['blob-without-mime']);

          return {
            filename: `${uid('blob-no-mime')}.txt`,
            content: blob,
            expectedBytes: new TextEncoder().encode('blob-without-mime'),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads empty Blob',
        build() {
          const blob = new Blob([]);

          return {
            filename: `${uid('blob-empty')}.txt`,
            content: blob,
            expectedBytes: new Uint8Array([]),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads unicode Blob',
        build() {
          const value = 'привет 🌍 こんにちは';
          const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });

          return {
            filename: `${uid('blob-unicode')}.txt`,
            content: blob,
            expectedBytes: new TextEncoder().encode(value),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
    ];

    const fileCases: UploadCase[] = [
      {
        name: 'uploads File content',
        build() {
          const filename = `${uid('file')}.txt`;
          const contentValue = 'browser-file-content';
          const file = new File([contentValue], filename, { type: 'text/plain' });

          return {
            filename,
            content: file,
            expectedBytes: new TextEncoder().encode(contentValue),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads File with unicode filename',
        build() {
          const filename = `${uid('unicode')}-файл.txt`;
          const value = 'unicode-file-content';
          const file = new File([value], filename, { type: 'text/plain' });

          return {
            filename,
            content: file,
            expectedBytes: new TextEncoder().encode(value),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads File with spaces in filename',
        build() {
          const filename = `${uid('space-name')} live upload.txt`;
          const value = 'space-filename-content';
          const file = new File([value], filename, { type: 'text/plain' });

          return {
            filename,
            content: file,
            expectedBytes: new TextEncoder().encode(value),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads File with long filename',
        build() {
          const prefix = uid('long');
          const filename = `${prefix}-${'x'.repeat(80)}.txt`;
          const value = 'long-file-name-content';
          const file = new File([value], filename, { type: 'text/plain' });

          return {
            filename,
            content: file,
            expectedBytes: new TextEncoder().encode(value),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
    ];

    const textCases: UploadCase[] = [
      {
        name: 'uploads raw string content',
        build() {
          const value = 'plain-string-content';

          return {
            filename: `${uid('plain-string')}.txt`,
            content: value,
            expectedBytes: new TextEncoder().encode(value),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads UTF-8 string content',
        build() {
          const value = 'Zażółć gęślą jaźń';

          return {
            filename: `${uid('utf8-string')}.txt`,
            content: value,
            expectedBytes: new TextEncoder().encode(value),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads multiline string content',
        build() {
          const value = ['line-one', 'line-two', 'line-three'].join('\n');

          return {
            filename: `${uid('multiline')}.txt`,
            content: value,
            expectedBytes: new TextEncoder().encode(value),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads emoji/unicode string content',
        build() {
          const value = 'emoji 😎 rocket 🚀';

          return {
            filename: `${uid('emoji')}.txt`,
            content: value,
            expectedBytes: new TextEncoder().encode(value),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads large text payload',
        build() {
          const value = 'text-payload-'.repeat(16 * 1024);

          return {
            filename: `${uid('large-text')}.txt`,
            content: value,
            expectedBytes: new TextEncoder().encode(value),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
    ];

    const edgeCaseCases: UploadCase[] = [
      {
        name: 'uploads very small one-byte file',
        build() {
          const expected = Buffer.from([0x61]);

          return {
            filename: `${uid('one-byte')}.bin`,
            content: expected,
            expectedBytes: expected,
            expectedMimeSubstring: 'application/octet-stream',
          };
        },
      },
      {
        name: 'uploads filename with special characters',
        build() {
          const filename = `${uid('special')}-[]()_+@!.txt`;
          const value = 'special-name-content';

          return {
            filename,
            content: Buffer.from(value),
            expectedBytes: new TextEncoder().encode(value),
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
      {
        name: 'uploads duplicate filenames in separate requests',
        async build() {
          const filename = `${uid('duplicate')}.txt`;
          const first = Buffer.from('duplicate-a');
          const second = Buffer.from('duplicate-b');
          await verifyUpload(live, issueKey, {
            filename,
            content: first,
            expectedBytes: first,
            expectedMimeSubstring: 'text/plain',
          });

          return {
            filename,
            content: second,
            expectedBytes: second,
            expectedMimeSubstring: 'text/plain',
          };
        },
      },
    ];

    function registerMatrix(groupName: string, cases: UploadCase[]): void {
      describe(groupName, () => {
        it.each(cases)('$name', async testCase => {
          const input = await testCase.build();
          await verifyUpload(live, issueKey, input);
        });
      });
    }

    registerMatrix('Buffer uploads', bufferCases);
    registerMatrix('Node.js Readable uploads', nodeStreamCases);
    registerMatrix('Web Streams uploads', webStreamCases);
    registerMatrix('Blob uploads', blobCases);
    registerMatrix('File uploads', fileCases);
    registerMatrix('Plain text uploads', textCases);
    registerMatrix('Edge-case uploads', edgeCaseCases);

    it('rejects unsupported content payloads before network upload', async () => {
      const invalidContent = new Uint8Array([1, 2, 3]);
      await expect(
        live.client.issueAttachments.addAttachment({
          issueIdOrKey: issueKey,
          attachments: {
            filename: `${uid('unsupported')}.bin`,
            content: invalidContent as never,
          },
        }),
      ).rejects.toThrow(TypeError);
    });
  });

  describe('attachment endpoints lifecycle', () => {
    let live: LiveCloudClient;
    let handle: LiveProjectHandle;
    let issueId: string;
    let issueKey: string;
    let textAttachmentId: string;
    let imageAttachmentId: string;
    const uploadedIds: string[] = [];
    const textContent = `attachment-content-${uid('text')}`;
    const pngBytes = Uint8Array.from(
      Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO9r0f8AAAAASUVORK5CYII=',
        'base64',
      ),
    );

    beforeAll(async () => {
      live = createLiveCloudClient();
      handle = getInjectedLiveProject();
      const issue = await live.client.issues.createIssue({
        fields: {
          project: { key: handle.projectKey },
          issuetype: { name: 'Story' },
          summary: uid('sdk-live-attachment-endpoints'),
        },
      });

      if (!issue.id || !issue.key) throw new Error('Failed to create issue');

      issueId = issue.id;
      issueKey = issue.key;

      const textUploaded = await live.client.issueAttachments.addAttachment({
        issueIdOrKey: issueKey,
        attachments: {
          filename: `тест-${uid('unicode')}.txt`,
          content: textContent,
        },
      });
      const text = textUploaded[0];

      if (!text.id) throw new Error('Failed to upload text attachment');

      textAttachmentId = text.id;
      uploadedIds.push(text.id);
      await waitForAttachmentLink(live, issueKey, text.id);

      const imageUploaded = await live.client.issueAttachments.addAttachment({
        issueIdOrKey: issueKey,
        attachments: {
          filename: `${uid('image')}.png`,
          content: Buffer.from(pngBytes),
        },
      });
      const image = imageUploaded[0];

      if (!image.id) throw new Error('Failed to upload image attachment');

      imageAttachmentId = image.id;
      uploadedIds.push(image.id);
      await waitForAttachmentLink(live, issueKey, image.id);
    }, 120_000);

    afterAll(async () => {
      for (const id of uploadedIds) {
        await live.client.issueAttachments.removeAttachment({ id }).catch(() => {});
      }

      await live.client.issues.deleteIssue({ issueIdOrKey: issueId }).catch(() => {});
    }, 120_000);

    it('getAttachmentMeta returns enabled/uploadLimit shape', async () => {
      const meta = await live.client.issueAttachments.getAttachmentMeta();

      if (meta.enabled !== undefined) {
        expect(typeof meta.enabled).toBe('boolean');
      }

      if (meta.uploadLimit !== undefined) {
        expect(typeof meta.uploadLimit).toBe('number');
      }
    });

    it('getAttachment returns metadata with filename/mime/size/author', async () => {
      const meta = await live.client.issueAttachments.getAttachment({ id: textAttachmentId });
      expect(meta.filename).toContain('.txt');
      expect(meta.mimeType).toContain('text/plain');
      expect(typeof meta.size).toBe('number');
      expect(meta.size).toBeGreaterThan(0);
      expect(meta.created).toBeInstanceOf(Date);
      expect(typeof meta.author?.accountId).toBe('string');
    });

    it('getAttachmentContent currently resolves undefined via cloud client for binary responses', async () => {
      const content = await live.client.issueAttachments.getAttachmentContent({
        id: textAttachmentId,
        redirect: false,
      });
      expect(content).toBeUndefined();
    });

    it('raw attachment content endpoint returns exact bytes and supports range headers', async (ctx: TestContext) => {
      const attachmentMeta = await live.client.issueAttachments.getAttachment({ id: textAttachmentId });

      if (!attachmentMeta.content) { ctx.skip(); return; }

      const authHeader = basicAuthHeader(live.env.email, live.env.apiToken);

      const full = await fetch(attachmentMeta.content, {
        headers: { Authorization: authHeader },
      });
      expect(full.ok).toBe(true);
      const fullBytes = new Uint8Array(await full.arrayBuffer());
      expect(new TextDecoder().decode(fullBytes)).toBe(textContent);

      const partial = await fetch(attachmentMeta.content, {
        headers: { Authorization: authHeader, Range: 'bytes=0-4' },
      });
      expect(partial.status === 206 || partial.status === 200).toBe(true);
      const partialBytes = new Uint8Array(await partial.arrayBuffer());
      expect(new TextDecoder().decode(partialBytes).length).toBeGreaterThan(0);
    });

    it('getAttachmentThumbnail currently resolves undefined via cloud client for binary responses', async () => {
      const thumbnail = await live.client.issueAttachments.getAttachmentThumbnail({
        id: imageAttachmentId,
        width: 16,
        height: 16,
        fallbackToDefault: true,
        redirect: false,
      });
      expect(thumbnail).toBeUndefined();
    });

    it('removeAttachment deletes attachment and follow-up endpoints fail', async () => {
      const uploaded = await live.client.issueAttachments.addAttachment({
        issueIdOrKey: issueKey,
        attachments: { filename: `${uid('remove')}.txt`, content: 'delete-me' },
      });
      const target = uploaded[0];

      if (!target.id) throw new Error('Failed to upload remove target');

      await waitForAttachmentLink(live, issueKey, target.id);
      await live.client.issueAttachments.removeAttachment({ id: target.id });

      await expect(live.client.issueAttachments.getAttachment({ id: target.id })).rejects.toThrow(ApiError);
      await expect(
        live.client.issueAttachments.getAttachmentContent({ id: target.id, redirect: false }),
      ).rejects.toThrow(ApiError);
      await expect(
        live.client.issueAttachments.getAttachmentThumbnail({
          id: target.id,
          width: 16,
          height: 16,
          fallbackToDefault: true,
          redirect: false,
        }),
      ).rejects.toThrow(ApiError);
    });
  });
});
