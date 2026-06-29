import { createRequire } from 'node:module';
import * as path from 'node:path';
import * as sinon from 'sinon';
import { describe, it, expect } from 'vitest';
import { Version3Client } from '@jirajs/version3';

const config = { host: 'https://test.atlassian.net' };

describe('IssueAttachments CJS build (#416)', () => {
  it('CJS require() + addAttachment does not throw "mime.getType is not a function"', async () => {
    const cjsPath = path.join(process.cwd(), 'dist/cjs/index.cjs');
    const require = createRequire(import.meta.url);
    const { Version3Client } = require(cjsPath);
    const client = new Version3Client(config);

    client.sendRequest = async () => [];

    expect(
      client.issueAttachments.addAttachment({
        issueIdOrKey: 'TEST-1',
        attachment: {
          file: Buffer.from('cjs test'),
          filename: 'cjs-test.txt',
        },
      }),
    ).resolves.toBeDefined();
  });
});

describe('IssueAttachments getAttachmentContent Range support (#396)', () => {
  it('maps `range` to the `Range` header and auto-sets redirect=false', async () => {
    const client = new Version3Client(config);
    const sendRequestStub = sinon.stub(client, 'sendRequest');

    await client.issueAttachments.getAttachmentContent({ id: '10000', range: 'bytes=0-1023' });

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/rest/api/3/attachment/content/10000');
    expect(callArgument.headers).toStrictEqual({ Range: 'bytes=0-1023' });
    expect(callArgument.params.redirect).toBe(false);
  });

  it('respects an explicit redirect=true together with `range`', async () => {
    const client = new Version3Client(config);
    const sendRequestStub = sinon.stub(client, 'sendRequest');

    await client.issueAttachments.getAttachmentContent({ id: '10000', range: 'bytes=0-1023', redirect: true });

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.headers?.Range).toBe('bytes=0-1023');
    expect(callArgument.params.redirect).toBe(true);
  });

  it('respects an explicit redirect=false together with `range`', async () => {
    const client = new Version3Client(config);
    const sendRequestStub = sinon.stub(client, 'sendRequest');

    await client.issueAttachments.getAttachmentContent({ id: '10000', range: 'bytes=0-1023', redirect: false });

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.headers?.Range).toBe('bytes=0-1023');
    expect(callArgument.params.redirect).toBe(false);
  });

  it('sends no `Range` header and leaves redirect unset when `range` is omitted', async () => {
    const client = new Version3Client(config);
    const sendRequestStub = sinon.stub(client, 'sendRequest');

    await client.issueAttachments.getAttachmentContent({ id: '10000' });

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.headers?.Range).toBeUndefined();
    expect(callArgument.params.redirect).toBeUndefined();
  });

  it('keeps the string-id form working (redirect=false, no `Range`)', async () => {
    const client = new Version3Client(config);
    const sendRequestStub = sinon.stub(client, 'sendRequest');

    await client.issueAttachments.getAttachmentContent('10000');

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.headers?.Range).toBeUndefined();
    expect(callArgument.params.redirect).toBe(false);
  });
});
