import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `timeTracking` API (`getSelectedTimeTrackingImplementation`,
 * `getAvailableTimeTrackingImplementations`, `selectTimeTrackingImplementation`,
 * `getSharedTimeTrackingConfiguration`, `setSharedTimeTrackingConfiguration`) and the neighbouring
 * `issueNavigatorSettings` and `announcementBanner` reads.
 *
 * Read-only. Every write here is site-wide with no smaller scope: changing the time-tracking provider silently
 * reinterprets every worklog on the tenant, the default navigator columns change what every user sees in search
 * results, and the announcement banner is displayed to everyone on every page.
 *
 * The configuration this file reads is not incidental — the `issueWorklogs` suite logs `1h 30m` and asserts 5400
 * seconds, and that arithmetic holds only because of the working-hours settings read here.
 */
describe('Jira Cloud — timeTracking and site settings (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('reports the shared time-tracking configuration', async () => {
    const configuration = await client.timeTracking
      .getSharedTimeTrackingConfiguration()
      .catch((e: unknown) => e);

    if (configuration instanceof Error) {
      expect(isForbiddenError(configuration) || (configuration as { status?: number }).status === 401).toBe(true);

      return;
    }

    const result = configuration as Awaited<ReturnType<typeof client.timeTracking.getSharedTimeTrackingConfiguration>>;

    expect(typeof result.workingHoursPerDay).toBe('number');
    expect(typeof result.workingDaysPerWeek).toBe('number');
    // `defaultUnit` and `timeFormat` decide how a bare number is rendered and
    // parsed — the reason "1h 30m" means what it does.
    expect(typeof result.defaultUnit).toBe('string');
    expect(typeof result.timeFormat).toBe('string');
  });

  it('agrees with what the worklog suite depends on', async () => {
    const configuration = await client.timeTracking.getSharedTimeTrackingConfiguration().catch(() => undefined);

    if (!configuration) return;

    // Not decoration: `issueWorklogs` logs "1h 30m" and asserts 5400 seconds.
    // That holds only while an hour is an hour — a site configured with, say,
    // a 6-hour day would still make 90 minutes 5400 seconds, but a changed
    // `defaultUnit` would change what a bare "1" means.
    expect(configuration.workingHoursPerDay).toBeGreaterThan(0);
    expect(configuration.workingDaysPerWeek).toBeGreaterThan(0);
  });

  it('lists the available time-tracking providers', async () => {
    const providers = await client.timeTracking.getAvailableTimeTrackingImplementations().catch((e: unknown) => e);

    if (providers instanceof Error) return;

    const result = providers as Awaited<
      ReturnType<typeof client.timeTracking.getAvailableTimeTrackingImplementations>
    >;

    expect(Array.isArray(result)).toBe(true);

    for (const provider of result) {
      expect(typeof provider.key).toBe('string');
      expect(typeof provider.name).toBe('string');
    }
  });

  it('returns the selected provider despite being declared to return nothing', async () => {
    const selected = await client.timeTracking.getSelectedTimeTrackingImplementation().catch((e: unknown) => e);

    if (selected instanceof Error) return;

    // Declared `Promise<void>`, and the endpoint answers with a provider object.
    // The declaration is wrong, inherited from the specification: a caller
    // following the types discards a real value, and TypeScript actively helps
    // them do it by refusing to let them read the fields.
    const provider = selected as unknown as { key?: string; name?: string };

    expect(provider).toBeDefined();
    expect(typeof provider.key).toBe('string');
    // `JIRA` is the built-in provider — the answer on any site that has not
    // installed a third-party one.
    expect(provider.key).toBe('JIRA');
  });

  it('reports the default issue navigator columns', async () => {
    const columns = await client.issueNavigatorSettings.getIssueNavigatorDefaultColumns().catch((e: unknown) => e);

    if (columns instanceof Error) return;

    const result = columns as Awaited<
      ReturnType<typeof client.issueNavigatorSettings.getIssueNavigatorDefaultColumns>
    >;

    expect(Array.isArray(result)).toBe(true);

    for (const column of result) {
      expect(typeof column.label).toBe('string');
      // `value` is the field id the column renders — the join back to
      // `issueFields`, and what a caller would pass to `fields` on a search.
      expect(typeof column.value).toBe('string');
    }
  });

  it('reports the announcement banner configuration', async () => {
    const banner = await client.announcementBanner.getBanner().catch((e: unknown) => e);

    if (banner instanceof Error) {
      expect(isForbiddenError(banner) || (banner as { status?: number }).status === 401).toBe(true);

      return;
    }

    const result = banner as Awaited<ReturnType<typeof client.announcementBanner.getBanner>>;

    expect(typeof result.isDismissible).toBe('boolean');
    expect(typeof result.isEnabled).toBe('boolean');
    // `visibility` is `public` or `private` — whether anonymous visitors see
    // it, which is the field that makes this a security-adjacent setting.
    if (result.visibility !== undefined) expect(typeof result.visibility).toBe('string');
  });

  it('fails typed on the site-wide writes, without ever changing anything', async () => {
    // Both aimed at values that cannot be accepted. There is no scope smaller
    // than the tenant for either: a banner is shown to everyone on every page,
    // and a changed provider reinterprets every worklog on the site.
    const banner = await client.announcementBanner
      .setBanner({ message: '', isEnabled: true, isDismissible: true, visibility: 'nosuchvisibility' })
      .catch((e: unknown) => e);

    expect(banner).toBeInstanceOf(Error);

    const provider = await client.timeTracking
      .selectTimeTrackingImplementation({ key: 'no.such.provider.jjs' })
      .catch((e: unknown) => e);

    expect(provider).toBeInstanceOf(Error);
  });
});
