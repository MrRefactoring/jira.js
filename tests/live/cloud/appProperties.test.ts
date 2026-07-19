import { beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `appProperties` API (`getAddonProperties`, `getAddonProperty`, `putAddonProperty`,
 * `deleteAddonProperty`, and the Forge variants) and the neighbouring `issueRedaction` and `uiModificationsApps`
 * reads.
 *
 * All app-only, and this file's job is to say so precisely. Unlike the webhook endpoints — which refuse a user token
 * outright — these are addressed by an app key that a user token simply has no claim to, so the failure is about
 * *identity* rather than permission and the status alone does not convey that.
 *
 * The distinction matters because these look like the entity-property endpoints covered elsewhere (issues, projects,
 * users, issue types), share their shape, and are the one member of that family a user token cannot use.
 */
describe('Jira Cloud — app properties and app-only modules (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('refuses to list app properties for user credentials', async () => {
    const error = await client.appProperties
      .getAddonProperties({ addonKey: 'com.example.no.such.app' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    // Not a 404 about the missing app: the request is refused before the key is
    // resolved, so an app that does exist fails identically.
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
    expect((error as { status?: number }).status).toBeLessThan(500);
  });

  it('refuses a single app property the same way', async () => {
    const error = await client.appProperties
      .getAddonProperty({ addonKey: 'com.example.no.such.app', propertyKey: 'jira.js.livetest' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the write, so no app state is ever touched', async () => {
    const error = await client.appProperties
      .putAddonProperty({
        addonKey: 'com.example.no.such.app',
        propertyKey: 'jira.js.livetest',
        body: { written: false },
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the Forge property variants too', async () => {
    const error = await client.appProperties.getForgeAppPropertyKeys().catch((e: unknown) => e);

    // Forge apps address their properties without an app key at all — the
    // identity comes from the token, which is exactly what a user token lacks.
    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the UI modification reads, which are app-scoped as well', async () => {
    const error = await client.uiModificationsApps.getUiModifications({ maxResults: 5 }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('reports redaction job status as unreachable rather than empty', async () => {
    const error = await client.issueRedaction
      .getRedactionStatus({ jobId: '00000000-0000-0000-0000-000000000000' })
      .catch((e: unknown) => e);

    // Redaction permanently destroys issue content, so it is gated hard. An
    // empty or optimistic answer here would be far worse than a refusal.
    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('never submits a redaction, and fails typed on the attempt', async () => {
    // Deliberately an empty payload. Redaction is irreversible — it overwrites
    // issue content on the tenant with no undo — so this only ever exercises
    // the error channel.
    const error = await client.issueRedaction.redact({ redactions: [] }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
