import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `myself` API (`getCurrentUser`, `getLocale`, `getPreference`, `setPreference`,
 * `removePreference`).
 *
 * Preferences are the one genuinely safe write on the authenticated account: they are per-user, arbitrary keys are
 * allowed, and removal restores the default. So the round trip is exercised for real — written, read back, deleted —
 * under a run-scoped key that cannot collide with a preference the account actually uses.
 */

/** Namespaced so a failed run can never clobber a real user preference. */
const PREFERENCE_KEY = 'jira.js.livetest.preference';

/**
 * `setPreference` declares its body as an object, but the endpoint is plain text: it stores whatever bytes it is given
 * and `getPreference` hands them straight back (verified live — a raw `raw-text-value` body reads back verbatim, and
 * the response schema is `z.string()` precisely because of that). The declared parameter type is wrong, inherited from
 * the specification; the cast records the mismatch here rather than papering over it, and the fix belongs upstream.
 */
function preferenceBody(value: string): Record<string, unknown> {
  return value as unknown as Record<string, unknown>;
}

describe('Jira Cloud — myself.getCurrentUser (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('identifies the account the credentials belong to', async () => {
    const me = await client.myself.getCurrentUser();

    expect(typeof me.accountId).toBe('string');
    expect(me.accountId).toBeTruthy();
    expect(me.active).toBe(true);
    expect(me.accountType).toBe('atlassian');
  });

  it('matches the email the client authenticates with', async () => {
    const me = await client.myself.getCurrentUser();
    const email = process.env.JIRA_EMAIL ?? process.env.EMAIL;

    if (me.emailAddress) expect(me.emailAddress.toLowerCase()).toBe(email!.toLowerCase());
  });

  it('expands groups and application roles only when asked', async () => {
    const plain = await client.myself.getCurrentUser();
    const expanded = await client.myself.getCurrentUser({ expand: ['groups', 'applicationRoles'] });

    expect(plain.groups?.size).toBeGreaterThan(0);
    expect(plain.groups?.items).toEqual([]);

    expect(expanded.groups?.items?.length).toBe(expanded.groups?.size);
    expect(expanded.applicationRoles?.items?.length).toBe(expanded.applicationRoles?.size);
  });
});

describe('Jira Cloud — myself.getLocale (live)', () => {
  it('returns a parseable locale tag', async () => {
    const locale = await getCloudClient().myself.getLocale();

    expect(typeof locale.locale).toBe('string');
    expect(locale.locale).toMatch(/^[a-z]{2}(_[A-Z]{2})?$/);
  });
});

describe('Jira Cloud — myself preferences (live, round trip)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  afterAll(async () => {
    await client.myself.removePreference({ key: PREFERENCE_KEY }).catch(() => undefined);
  });

  it('stores a preference and reads back exactly what was written', async () => {
    await client.myself.setPreference({ key: PREFERENCE_KEY, body: preferenceBody('stored-by-live-test') });

    const value = await client.myself.getPreference({ key: PREFERENCE_KEY });

    expect(value).toBe('stored-by-live-test');
  });

  it('overwrites rather than appending on a second write', async () => {
    await client.myself.setPreference({ key: PREFERENCE_KEY, body: preferenceBody('second') });

    expect(await client.myself.getPreference({ key: PREFERENCE_KEY })).toBe('second');
  });

  it('makes the preference unreadable once removed', async () => {
    await client.myself.setPreference({ key: PREFERENCE_KEY, body: preferenceBody('transient') });
    await client.myself.removePreference({ key: PREFERENCE_KEY });

    const error = await client.myself.getPreference({ key: PREFERENCE_KEY }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBe(404);
  });
});
