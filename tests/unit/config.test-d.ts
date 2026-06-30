import { assertType, describe, expectTypeOf, test } from 'vitest';
import { type Config, Version3Client } from '@jirajs';

describe('Config typing: `host` is required unless OAuth 2.0 is used', () => {
  test('valid configurations compile', () => {
    // OAuth 2.0 → `host` may be omitted (cloudId is resolved automatically)
    assertType<Config>({ authentication: { oauth2: { accessToken: 'tok' } } });
    assertType<Config>({ host: 'https://x.atlassian.net', authentication: { oauth2: { accessToken: 'tok' } } });

    // Basic / JWT / no auth → `host` is supplied
    assertType<Config>({ host: 'https://x.atlassian.net', authentication: { basic: { email: 'a@b.c', apiToken: 'x' } } });
    assertType<Config>({ host: 'https://x.atlassian.net', authentication: { jwt: { issuer: 'i', secret: 's' } } });
    assertType<Config>({ host: 'https://x.atlassian.net' });
  });

  test('omitting `host` without OAuth 2.0 is a compile-time error', () => {
    // @ts-expect-error Basic authentication requires `host`
    assertType<Config>({ authentication: { basic: { email: 'a@b.c', apiToken: 'x' } } });

    // @ts-expect-error JWT requires `host`
    assertType<Config>({ authentication: { jwt: { issuer: 'i', secret: 's' } } });

    // @ts-expect-error neither `host` nor OAuth 2.0 is provided
    assertType<Config>({});
  });

  test('the client constructor enforces the same rule', () => {
    new Version3Client({ authentication: { oauth2: { accessToken: 'tok' } } });
    new Version3Client({ host: 'https://x.atlassian.net', authentication: { basic: { email: 'a@b.c', apiToken: 'x' } } });

    // @ts-expect-error Basic authentication requires `host`
    new Version3Client({ authentication: { basic: { email: 'a@b.c', apiToken: 'x' } } });
  });

  test('`host` is `string | undefined` across the union', () => {
    expectTypeOf<Config['host']>().toEqualTypeOf<string | undefined>();
  });
});
