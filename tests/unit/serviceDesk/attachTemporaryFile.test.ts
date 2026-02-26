import { createRequire } from 'node:module';
import * as path from 'node:path';
import { describe, it, expect } from 'vitest';

const config = { host: 'https://test.atlassian.net' };

describe('attachTemporaryFile CJS build (#416)', () => {
  it('CJS require() + attachTemporaryFile does not throw "mime.getType is not a function"', async () => {
    const cjsPath = path.join(process.cwd(), 'dist/cjs/index.cjs');
    const require = createRequire(import.meta.url);
    const { ServiceDeskClient } = require(cjsPath);
    const client = new ServiceDeskClient(config);

    client.sendRequest = async () => ({});

    expect(
      client.serviceDesk.attachTemporaryFile({
        serviceDeskId: '1',
        attachment: {
          file: Buffer.from('cjs test'),
          filename: 'cjs-test.txt',
        },
      }),
    ).resolves.toBeDefined();
  });
});
