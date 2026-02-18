import { createRequire } from 'node:module';
import * as path from 'node:path';
import { describe, it, expect } from 'vitest';

const config = { host: 'https://test.atlassian.net' };

describe('IssueAttachments CJS build (#416)', () => {
  it('CJS require() + addAttachment does not throw "mime.getType is not a function"', async () => {
    const cjsPath = path.join(process.cwd(), 'dist/cjs/index.cjs');
    const require = createRequire(import.meta.url);
    const { Version2Client } = require(cjsPath);
    const client = new Version2Client(config);

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
