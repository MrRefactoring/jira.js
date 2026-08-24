/**
 * Checks that a webhook body really came from your Jira site.
 *
 * A webhook registered with a secret arrives signed: Jira computes HMAC-SHA256 over the exact bytes of the request
 * body and sends the digest as `X-Hub-Signature: sha256=<hex>`. Recomputing it with the same secret is the only thing
 * that distinguishes a delivery from Jira from a POST anyone on the internet can make to the same URL.
 *
 * ```ts
 * import { verifyWebhookSignature } from 'jira.js/webhooks';
 *
 * app.post('/jira', express.raw({ type: 'application/json' }), async (request, response) => {
 *   const trusted = await verifyWebhookSignature({
 *     body: request.body,
 *     secret: process.env.JIRA_WEBHOOK_SECRET!,
 *     signature: request.get('x-hub-signature'),
 *   });
 *
 *   if (!trusted) return response.sendStatus(401);
 *
 *   const payload = JSON.parse(request.body.toString()) as WebhookPayload;
 * });
 * ```
 *
 * The body must be the bytes that arrived. Re-serialising a parsed object — `JSON.stringify(request.body)` — produces
 * a different byte sequence for the same data, because key order, whitespace and number formatting are not preserved,
 * and the signature will not match. Every framework has a way to keep the raw body; use it.
 *
 * Nothing here is imported: `crypto.subtle` is a global in Node 18 and later and in every browser, so this subpath
 * stays free of Node built-ins and the browser bundle is unaffected.
 */

/** How a signature was computed. Jira sends `sha256`; nothing else is accepted. */
const ALGORITHM = 'sha256';

export interface VerifyWebhookSignatureOptions {
  /**
   * The raw request body, exactly as it arrived — not a parsed object re-serialised, whose bytes differ from what was
   * signed.
   */
  body: string | ArrayBuffer | Uint8Array;

  /** The secret you gave Jira when you registered the webhook. */
  secret: string;

  /**
   * The `X-Hub-Signature` header. Passing `undefined` is the ordinary case of an unsigned delivery and answers
   * `false`, so a missing header needs no separate branch of yours.
   */
  signature: string | undefined;
}

/**
 * Copies into an array `crypto.subtle` accepts.
 *
 * `BufferSource` excludes a view onto a `SharedArrayBuffer`, which a plain `Uint8Array` may be; constructing a new one
 * both narrows the type and respects the offset and length of a view onto a larger buffer, which a webhook body read
 * out of a pooled buffer usually is.
 */
function toBytes(value: string | ArrayBuffer | Uint8Array): Uint8Array<ArrayBuffer> {
  if (typeof value === 'string') return new TextEncoder().encode(value);

  return new Uint8Array(value);
}

function fromHex(hex: string): Uint8Array | undefined {
  if (hex.length === 0 || hex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(hex)) return undefined;

  const bytes = new Uint8Array(hex.length / 2);

  for (let index = 0; index < bytes.length; index++) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }

  return bytes;
}

/**
 * Compares two digests without letting the time taken reveal how far they matched.
 *
 * A `===` on hex strings stops at the first differing character, and an attacker who can send many deliveries and
 * measure the replies can recover a valid signature one character at a time. Differing lengths are answered at once
 * on purpose: the length of a digest is public, its contents are not.
 */
function equalInConstantTime(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;

  let difference = 0;

  for (let index = 0; index < left.length; index++) difference |= left[index]! ^ right[index]!;

  return difference === 0;
}

/**
 * Whether the body carries a signature this secret produces.
 *
 * Answers `false` for every way a delivery can fail to be trustworthy — no header, an algorithm other than `sha256`,
 * a digest that is not hexadecimal, a digest of the right shape and the wrong value — because a handler's response to
 * all four is the same, and telling them apart to the caller would tell them apart to whoever is probing the endpoint.
 *
 * Throws only on a mistake of yours: an empty secret would make every delivery verify against a value an attacker can
 * compute, so it is a programming error rather than a failed check.
 */
export async function verifyWebhookSignature(options: VerifyWebhookSignatureOptions): Promise<boolean> {
  const { body, secret, signature } = options;

  if (secret.length === 0) {
    throw new TypeError('verifyWebhookSignature: the secret is empty, which would verify every body ever sent');
  }

  if (signature === undefined) return false;

  const separator = signature.indexOf('=');

  if (signature.slice(0, separator) !== ALGORITHM) return false;

  const sent = fromHex(signature.slice(separator + 1));

  if (sent === undefined) return false;

  const key = await crypto.subtle.importKey(
    'raw',
    toBytes(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const computed = new Uint8Array(await crypto.subtle.sign('HMAC', key, toBytes(body)));

  return equalInConstantTime(computed, sent);
}
