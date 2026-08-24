import { describe, expect, it } from 'vitest';
import { verifyWebhookSignature } from '#/webhooks/verify';

const SECRET = 'shhh';

async function sign(body: string, secret = SECRET): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const digest = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body)));

  return `sha256=${[...digest].map(byte => byte.toString(16).padStart(2, '0')).join('')}`;
}

describe('verifyWebhookSignature', () => {
  it('accepts a body signed with the same secret', async () => {
    const body = '{"webhookEvent":"jira:issue_created"}';

    await expect(verifyWebhookSignature({ body, secret: SECRET, signature: await sign(body) })).resolves.toBe(true);
  });

  it('rejects a body altered after it was signed', async () => {
    const signature = await sign('{"webhookEvent":"jira:issue_created"}');

    await expect(
      verifyWebhookSignature({ body: '{"webhookEvent":"jira:issue_deleted"}', secret: SECRET, signature }),
    ).resolves.toBe(false);
  });

  it('rejects the right body signed with a different secret', async () => {
    const body = '{"webhookEvent":"jira:issue_created"}';

    await expect(
      verifyWebhookSignature({ body, secret: SECRET, signature: await sign(body, 'not the secret') }),
    ).resolves.toBe(false);
  });

  it('agrees with RFC 4231 test case 2, so the algorithm is the one Jira uses', async () => {
    const expected = '5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843';

    await expect(
      verifyWebhookSignature({
        body: 'what do ya want for nothing?',
        secret: 'Jefe',
        signature: `sha256=${expected}`,
      }),
    ).resolves.toBe(true);
  });

  it('reads the same bytes whether they arrive as a string, a view or a buffer', async () => {
    const body = '{"webhookEvent":"comment_created"}';
    const signature = await sign(body);
    const bytes = new TextEncoder().encode(body);

    await expect(verifyWebhookSignature({ body: bytes, secret: SECRET, signature })).resolves.toBe(true);
    await expect(verifyWebhookSignature({ body: bytes.buffer, secret: SECRET, signature })).resolves.toBe(true);
  });

  it('reads a view onto a larger buffer by its own offset and length', async () => {
    const body = '{"webhookEvent":"comment_created"}';
    const signature = await sign(body);
    const padded = new Uint8Array(64 + body.length);

    padded.set(new TextEncoder().encode(body), 64);

    await expect(
      verifyWebhookSignature({ body: padded.subarray(64), secret: SECRET, signature }),
    ).resolves.toBe(true);
  });

  it('answers false for an unsigned delivery rather than making the caller branch', async () => {
    await expect(verifyWebhookSignature({ body: '{}', secret: SECRET, signature: undefined })).resolves.toBe(false);
  });

  it.each([
    ['an algorithm we do not accept', 'sha1=aabb'],
    ['a digest with no algorithm', 'aabbccdd'],
    ['a digest that is not hexadecimal', 'sha256=zzzz'],
    ['a digest of odd length', 'sha256=abc'],
    ['an empty digest', 'sha256='],
    ['an empty header', ''],
  ])('rejects %s', async (_, signature) => {
    await expect(verifyWebhookSignature({ body: '{}', secret: SECRET, signature })).resolves.toBe(false);
  });

  it('rejects a digest of the right shape but the wrong length', async () => {
    await expect(
      verifyWebhookSignature({ body: '{}', secret: SECRET, signature: 'sha256=aabb' }),
    ).resolves.toBe(false);
  });

  it('throws on an empty secret, which would verify anything', async () => {
    await expect(
      verifyWebhookSignature({ body: '{}', secret: '', signature: 'sha256=aabb' }),
    ).rejects.toThrow(TypeError);
  });
});
