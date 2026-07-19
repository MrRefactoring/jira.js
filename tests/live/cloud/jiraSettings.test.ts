import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError, isSchemaMismatchError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `jiraSettings` API (`getApplicationProperty`, `getAdvancedSettings`, `setApplicationProperty`,
 * `getConfiguration`).
 *
 * Read-only, and firmly so. These are site-wide switches: `setApplicationProperty` changes behaviour for every user
 * on the tenant, with no scope smaller than the whole site to contain a mistake. A test that flipped one and failed
 * before restoring it would leave the site altered — so the write is pinned only through its error channel, aimed at
 * a key that cannot exist.
 *
 * `getConfiguration` is the useful half: it reports which optional features are switched on, and several other suites
 * only make sense in light of it — time tracking, sub-tasks and issue linking are all optional, and code that assumes
 * them works on one tenant and breaks on the next.
 */
describe('Jira Cloud — jiraSettings (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('reports which optional features the site has switched on', async () => {
    const configuration = await client.jiraSettings.getConfiguration();

    expect(typeof configuration.votingEnabled).toBe('boolean');
    expect(typeof configuration.watchingEnabled).toBe('boolean');
    expect(typeof configuration.subTasksEnabled).toBe('boolean');
    expect(typeof configuration.attachmentsEnabled).toBe('boolean');
    expect(typeof configuration.issueLinkingEnabled).toBe('boolean');
    expect(typeof configuration.timeTrackingEnabled).toBe('boolean');
  });

  it('agrees with what the other live suites were able to do', async () => {
    const configuration = await client.jiraSettings.getConfiguration();

    // Not decoration: the votes, watchers, attachments, links and worklog
    // suites all exercise features that a site can switch off. If one of these
    // ever goes false, those suites start failing for a reason that has nothing
    // to do with the library, and this assertion is what says so.
    expect(configuration.votingEnabled).toBe(true);
    expect(configuration.watchingEnabled).toBe(true);
    expect(configuration.attachmentsEnabled).toBe(true);
    expect(configuration.issueLinkingEnabled).toBe(true);
    expect(configuration.timeTrackingEnabled).toBe(true);
  });

  it('describes the time-tracking configuration when it is on', async () => {
    const configuration = await client.jiraSettings.getConfiguration();

    if (!configuration.timeTrackingEnabled) return;

    // The worklog suite logs "1h 30m" and expects 5400 seconds — an arithmetic
    // that depends on these two numbers, not on anything universal.
    expect(configuration.timeTrackingConfiguration?.workingHoursPerDay).toBeGreaterThan(0);
    expect(configuration.timeTrackingConfiguration?.workingDaysPerWeek).toBeGreaterThan(0);
  });

  it('lists advanced settings for an admin, or fails typed', async () => {
    const result = await client.jiraSettings.getAdvancedSettings().catch((e: unknown) => e);

    if (result instanceof Error) {
      expect(isForbiddenError(result) || (result as { status?: number }).status === 401).toBe(true);

      return;
    }

    const settings = result as Awaited<ReturnType<typeof client.jiraSettings.getAdvancedSettings>>;

    expect(settings.length).toBeGreaterThan(0);

    for (const setting of settings) {
      expect(typeof setting.id).toBe('string');
      expect(typeof setting.key).toBe('string');
      // `type` says how to render the value, which arrives as a string whatever
      // it actually is — a boolean setting reads back as "true", not `true`.
      expect(typeof setting.type).toBe('string');
    }
  });

  it('changes response shape with the parameter, which the declared type does not survive', async () => {
    const settings = await client.jiraSettings.getAdvancedSettings().catch(() => undefined);

    if (!settings?.length) return;

    const sample = settings[0]!;

    // Asking by `key` returns a single object; the operation is declared to
    // return an array. Validation catches it — which is the whole value of
    // parsing rather than casting, since `result.map(...)` would otherwise
    // crash somewhere far away from the call that caused it.
    const error = await client.jiraSettings.getApplicationProperty({ key: sample.key! }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).name).toBe('ZodError');

    // But it arrives as a bare ZodError, not as the library's own
    // SchemaMismatchError: `createClient` calls `schema.parse` directly, and the
    // wrapping lives in the standalone `sendRequest` helper that no api module
    // uses. So `isSchemaMismatchError` never answers true on a real call path,
    // and a caller branching on it silently falls through to a generic handler.
    expect(isSchemaMismatchError(error)).toBe(false);

    // Asking by `keyFilter` returns the array the type promises, so the
    // declaration is not wrong so much as it describes only one of two shapes.
    const filtered = await client.jiraSettings.getApplicationProperty({ keyFilter: sample.key! });

    expect(Array.isArray(filtered)).toBe(true);
    expect(filtered.map(property => property.key)).toContain(sample.key);
  });

  it('surfaces an unknown property key as a typed error', async () => {
    const error = await client.jiraSettings
      .getApplicationProperty({ key: 'no.such.property.jjs' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error) || (error as { status?: number }).status === 400).toBe(
      true,
    );
  });

  it('fails typed on the site-wide write, without ever aiming it at a real setting', async () => {
    // A key that cannot exist. There is no scope smaller than the whole tenant
    // for this endpoint, so a real key is never passed — a failed restore would
    // leave every user on the site with changed behaviour.
    const error = await client.jiraSettings
      .setApplicationProperty({ id: 'no.such.property.jjs', body: { value: 'x' } })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
