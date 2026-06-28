import type { JWT } from '../../../config';
import { bytesToBase64Url, encodeBase64Url } from '../base64Encoder';

/** The query-string parameter that must be excluded from the qsh, per the Atlassian JWT spec. */
const QSH_EXCLUDED_PARAM = 'jwt';

/** Default token lifetime: 3 minutes, as recommended by Atlassian. */
const DEFAULT_EXPIRY_TIME_SECONDS = 180;

/**
 * RFC 3986 percent-encoding. `encodeURIComponent` leaves `! ' ( ) *` unescaped, so we encode those four
 * characters explicitly to match Atlassian's canonicalization.
 */
function encodeRfc3986(value: string): string {
  return encodeURIComponent(value).replace(/[!'()*]/g, char => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
}

function canonicalizeMethod(method: string): string {
  return method.toUpperCase();
}

/**
 * Canonical URI: leading `/`, no trailing `/` (unless the path is just `/`), any `&` in the path replaced with
 * `%26`. For Jira Cloud there is no context path, so the canonical URI is simply the pathname.
 */
function canonicalizeUri(pathname: string): string {
  if (!pathname || pathname.length === 0) {
    return '/';
  }

  let path = pathname.charAt(0) === '/' ? pathname : `/${pathname}`;

  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  return path.replace(/&/g, '%26');
}

/**
 * Canonical query string: parameters (excluding `jwt`) sorted by RFC 3986-encoded name, each parameter's values
 * sorted and RFC 3986-encoded, repeated values joined with `,`, and `name=value` pairs joined with `&`. Body
 * params are never included.
 */
function canonicalizeQueryString(searchParams: URLSearchParams): string {
  const keys = [...new Set(searchParams.keys())].filter(key => key !== QSH_EXCLUDED_PARAM).sort();

  return keys
    .map(key => {
      const value = searchParams.getAll(key).sort().map(encodeRfc3986).join(',');

      return `${encodeRfc3986(key)}=${value}`;
    })
    .join('&');
}

/** SHA-256 hex of `METHOD&canonicalUri&canonicalQueryString` using isomorphic WebCrypto. */
async function createQueryStringHash(method: string, url: string): Promise<string> {
  const parsed = new URL(url);

  const canonicalRequest = [
    canonicalizeMethod(method),
    canonicalizeUri(parsed.pathname),
    canonicalizeQueryString(parsed.searchParams),
  ].join('&');

  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonicalRequest));

  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

/** HMAC-SHA256 sign, base64url-encoded, using isomorphic WebCrypto. */
async function signHs256(signingInput: string, secret: string): Promise<string> {
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await globalThis.crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signingInput));

  return bytesToBase64Url(new Uint8Array(signature));
}

export async function createJWTAuthentication(
  authenticationData: JWT,
  requestData: { method: string; url: string },
): Promise<string> {
  const { method, url } = requestData;

  const now = Math.floor(Date.now() / 1000);
  const expire = now + (authenticationData.expiryTimeSeconds ?? DEFAULT_EXPIRY_TIME_SECONDS);

  const header = { typ: 'JWT', alg: 'HS256' };
  const claims = {
    iss: authenticationData.issuer,
    iat: now,
    exp: expire,
    qsh: await createQueryStringHash(method, url),
  };

  const signingInput = `${encodeBase64Url(JSON.stringify(header))}.${encodeBase64Url(JSON.stringify(claims))}`;
  const signature = await signHs256(signingInput, authenticationData.secret);

  return `JWT ${signingInput}.${signature}`;
}
