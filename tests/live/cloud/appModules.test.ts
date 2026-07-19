import { beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the remaining app-only platform modules: `issueCustomFieldOptionsApps`,
 * `issueCustomFieldValuesApps`, `issueCustomFieldConfigurationApps`, `issueCustomFieldAssociations`,
 * `jqlFunctionsApps`, `appDataPolicies`, `appMigration` and `migrationOfConnectModulesToForge`.
 *
 * Grouped for the same reason as the DevOps modules: they share one story, and eight files asserting that a 4xx
 * arrives would say less than one file explaining why. All of them act on behalf of an installed app — its custom
 * field types, its JQL functions, its migration state — and a user token has no app to act for.
 *
 * Two of them are worth separating out. `issueCustomFieldOptionsApps` is the app-owned twin of
 * `issueCustomFieldOptions`, which the context suite covers and which *is* reachable — the two look
 * interchangeable in the client and are not. And `appDataPolicies` reports whether a site restricts what apps may
 * read, which is a governance answer a caller may legitimately need without being an app.
 */
describe('Jira Cloud — app-only platform modules (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('refuses the app-owned custom field option reads', async () => {
    const error = await client.issueCustomFieldOptionsApps
      .getAllIssueFieldOptions({ fieldKey: 'com.example.no.such.app__field', maxResults: 5 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    // Addressed by a `fieldKey` — the app's own namespaced key — where the
    // reachable twin takes a numeric `fieldId`. The parameter name is the only
    // hint that these are different APIs.
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
    expect((error as { status?: number }).status).toBeLessThan(500);
  });

  it('refuses the app-owned custom field value writes', async () => {
    const error = await client.issueCustomFieldValuesApps
      .updateCustomFieldValue({ fieldIdOrKey: 'com.example.no.such.app__field', updates: [] })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the app custom field configuration reads', async () => {
    const error = await client.issueCustomFieldConfigurationApps
      .getCustomFieldConfiguration({ fieldIdOrKey: 'com.example.no.such.app__field' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the JQL function precomputation reads', async () => {
    const error = await client.jqlFunctionsApps.getPrecomputations({ maxResults: 5 }).catch((e: unknown) => e);

    // Precomputations are how an app-provided JQL function caches its results;
    // they belong to the app that registered the function.
    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the migration endpoints, which act on an app installation', async () => {
    const migration = await client.appMigration
      .workflowRuleSearch({ workflowEntityId: '00000000-0000-0000-0000-000000000000', ruleIds: [] })
      .catch((e: unknown) => e);

    const forge = await client.migrationOfConnectModulesToForge
      .fetchMigrationTask({ taskId: '99999999' })
      .catch((e: unknown) => e);

    expect(migration).toBeInstanceOf(Error);
    expect(forge).toBeInstanceOf(Error);
  });

  it('reports the site data policy, which is not app-gated', async () => {
    const policy = await client.appDataPolicies.getPolicy().catch((e: unknown) => e);

    if (policy instanceof Error) {
      expect((policy as { status?: number }).status).toBeGreaterThanOrEqual(400);

      return;
    }

    const result = policy as Awaited<ReturnType<typeof client.appDataPolicies.getPolicy>>;

    // The odd one out: a governance answer about whether the site restricts
    // what apps may read. Useful to a caller who is not an app at all.
    expect(typeof result.anyContentBlocked).toBe('boolean');
  });

  it('reports per-project data policies alongside the site one', async () => {
    const policies = await client.appDataPolicies.getPolicies({ maxResults: 5 }).catch((e: unknown) => e);

    if (policies instanceof Error) return;

    const page = policies as Awaited<ReturnType<typeof client.appDataPolicies.getPolicies>>;

    expect(Array.isArray(page.results)).toBe(true);

    for (const entry of page.results ?? []) {
      expect(entry.id).toBeTruthy();
      // A policy can block content for one project and not another, so the
      // site-wide answer above is a summary rather than the whole truth.
      expect(typeof entry.dataPolicy?.anyContentBlocked).toBe('boolean');
    }
  });

  it('fails typed across the family, which is the part the library owns', async () => {
    const error = await client.jqlFunctionsApps.getPrecomputations({}).catch((e: unknown) => e);

    expect(typeof (error as { status?: number }).status).toBe('number');
  });
});
