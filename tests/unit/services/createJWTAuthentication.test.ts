import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  SymmetricAlgorithm,
  createQueryStringHash,
  decodeSymmetric,
  encodeSymmetric,
  fromMethodAndUrl,
} from '@atlassian/atlassian-jwt';
import type { Config } from '@jirajs';
import { getAuthenticationToken } from '@jirajs/services/authenticationService';
import { createJWTAuthentication } from '@jirajs/services/authenticationService/authentications';

const ISSUER = 'my-connect-app-key';
const SECRET = 'shhh-super-secret-shared-secret';
const HOST = 'https://example.atlassian.net';

const stripPrefix = (header: string) => header.replace(/^JWT /, '');
const decodeSegment = (segment: string) =>
  JSON.parse(Buffer.from(segment.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-06-27T00:00:00.000Z'));
});

afterEach(() => {
  vi.useRealTimers();
});

const urlMatrix = [
  { method: 'GET', url: `${HOST}/rest/api/3/myself` }, // no query
  { method: 'get', url: `${HOST}/rest/api/3/myself` }, // lowercase method
  { method: 'POST', url: `${HOST}/rest/api/3/issue` }, // different method
  { method: 'GET', url: `${HOST}/rest/api/3/search?startAt=0` }, // single param
  { method: 'GET', url: `${HOST}/rest/api/3/search?maxResults=50&startAt=0` }, // sorted params
  { method: 'GET', url: `${HOST}/rest/api/3/search?fields=summary&fields=status` }, // repeated params
  { method: 'GET', url: `${HOST}/rest/api/3/search?jql=summary ~ "foo bar"` }, // needs encoding
  { method: 'GET', url: `${HOST}/rest/api/3/search?expand=a,b,c` }, // comma value
  { method: 'GET', url: `${HOST}/rest/api/3/project/` }, // trailing slash
];

describe('qsh matches @atlassian/atlassian-jwt across the URL matrix', () => {
  test.each(urlMatrix)('$method $url', async ({ method, url }) => {
    const token = stripPrefix(await createJWTAuthentication({ issuer: ISSUER, secret: SECRET }, { method, url }));
    const claims = decodeSegment(token.split('.')[1]);

    const expectedQsh = createQueryStringHash(fromMethodAndUrl(method, url));

    expect(claims.qsh).toBe(expectedQsh);
  });
});

describe('token structure', () => {
  test('header and claims are well-formed', async () => {
    const token = stripPrefix(
      await createJWTAuthentication(
        { issuer: ISSUER, secret: SECRET, expiryTimeSeconds: 600 },
        { method: 'GET', url: `${HOST}/rest/api/3/myself` },
      ),
    );
    const [headerB64, claimsB64] = token.split('.');
    const now = Math.floor(Date.now() / 1000);

    expect(decodeSegment(headerB64)).toEqual({ typ: 'JWT', alg: 'HS256' });
    expect(decodeSegment(claimsB64)).toMatchObject({ iss: ISSUER, iat: now, exp: now + 600 });
  });

  test('default expiry is 180 seconds', async () => {
    const token = stripPrefix(
      await createJWTAuthentication(
        { issuer: ISSUER, secret: SECRET },
        { method: 'GET', url: `${HOST}/rest/api/3/myself` },
      ),
    );
    const claims = decodeSegment(token.split('.')[1]);

    expect(claims.exp - claims.iat).toBe(180);
  });
});

describe('signature', () => {
  test('verifies with the reference implementation and rejects a wrong secret', async () => {
    const token = stripPrefix(
      await createJWTAuthentication(
        { issuer: ISSUER, secret: SECRET },
        { method: 'GET', url: `${HOST}/rest/api/3/myself` },
      ),
    );

    expect(() => decodeSymmetric(token, SECRET, SymmetricAlgorithm.HS256)).not.toThrow();
    expect(() => decodeSymmetric(token, 'wrong-secret', SymmetricAlgorithm.HS256)).toThrow();
  });

  test('full token byte-matches the reference encodeSymmetric', async () => {
    const now = Math.floor(Date.now() / 1000);
    const claims = {
      iss: ISSUER,
      iat: now,
      exp: now + 180,
      qsh: createQueryStringHash(fromMethodAndUrl('GET', `${HOST}/rest/api/3/myself`)),
    };
    const expected = encodeSymmetric(claims, SECRET, SymmetricAlgorithm.HS256);

    const token = stripPrefix(
      await createJWTAuthentication(
        { issuer: ISSUER, secret: SECRET },
        { method: 'GET', url: `${HOST}/rest/api/3/myself` },
      ),
    );

    expect(token).toBe(expected);
  });
});

describe('getAuthenticationToken dispatch', () => {
  test('returns "JWT <token>" for a jwt config', async () => {
    const authentication: Config['authentication'] = { jwt: { issuer: ISSUER, secret: SECRET } };

    const token = await getAuthenticationToken(authentication, { method: 'GET', url: `${HOST}/rest/api/3/myself` });

    expect(token?.startsWith('JWT ')).toBe(true);
    expect(decodeSegment(stripPrefix(token!).split('.')[1]).iss).toBe(ISSUER);
  });

  test('throws when a jwt config is used without request data', async () => {
    const authentication: Config['authentication'] = { jwt: { issuer: ISSUER, secret: SECRET } };

    await expect(getAuthenticationToken(authentication)).rejects.toThrow(/requires request data/);
  });
});
