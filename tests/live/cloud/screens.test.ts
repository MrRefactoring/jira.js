import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `screens` API (`getScreens`, `getScreensForField`, `getAvailableScreenFields`,
 * `addFieldToDefaultScreen`).
 *
 * Read-only. A screen decides which fields appear when an issue is created, edited or transitioned; adding a field to
 * the default screen changes what every user of every project sees on the create dialog. There is no project-scoped
 * variant to contain a mistake, so the write half is pinned only through its error channel.
 *
 * The read half is genuinely useful to other work: `getScreensForField` answers "where would a user actually see this
 * field", which is the question behind most "why is my custom field missing" reports — a field can exist, be on the
 * right issue type, and still be invisible because no screen carries it.
 */
describe('Jira Cloud — screens (live, read-only)', () => {
  let client: CloudClient;
  let permitted = true;

  beforeAll(async () => {
    client = getCloudClient();

    permitted = await client.screens
      .getScreens({ maxResults: 1 })
      .then(() => true)
      .catch(() => false);
  });

  it('pages the screen listing, or refuses typed without admin rights', async () => {
    if (!permitted) {
      const error = await client.screens.getScreens({ maxResults: 1 }).catch((e: unknown) => e);

      expect(isForbiddenError(error) || (error as { status?: number }).status === 401).toBe(true);

      return;
    }

    const page = await client.screens.getScreens({ maxResults: 5 });

    expect(Array.isArray(page.values)).toBe(true);
    expect(page.maxResults).toBe(5);
    expect(typeof page.isLast).toBe('boolean');

    for (const screen of page.values ?? []) {
      expect(typeof screen.id).toBe('number');
      expect(typeof screen.name).toBe('string');
    }
  });

  it('distinguishes global screens from project-scoped ones', async () => {
    if (!permitted) return;

    const page = await client.screens.getScreens({ maxResults: 50 });

    for (const screen of page.values ?? []) {
      if (screen.scope === undefined) continue;

      expect(['GLOBAL', 'TEMPLATE', 'PROJECT']).toContain(screen.scope.type);
    }
  });

  it('filters the listing by scope', async () => {
    if (!permitted) return;

    const global = await client.screens.getScreens({ scope: ['GLOBAL'], maxResults: 50 });

    for (const screen of global.values ?? []) {
      if (screen.scope !== undefined) expect(screen.scope.type).toBe('GLOBAL');
    }
  });

  it('answers where a custom field would be visible', async () => {
    if (!permitted) return;

    const fields = await client.issueFields.getFields();
    const custom = fields.find(field => field.custom);

    if (!custom) return;

    const page = await client.screens.getScreensForField({ fieldId: custom.id!, maxResults: 10 });

    expect(Array.isArray(page.values)).toBe(true);
    for (const screen of page.values ?? []) expect(typeof screen.id).toBe('number');
  });

  it('refuses a system field outright, despite it being on every screen', async () => {
    if (!permitted) return;

    const error = await client.screens.getScreensForField({ fieldId: 'summary', maxResults: 10 }).catch(e => e);

    expect((error as { status?: number }).status).toBe(404);
  });

  it('refuses an unknown custom field the same way', async () => {
    if (!permitted) return;

    const error = await client.screens
      .getScreensForField({ fieldId: 'customfield_99999999', maxResults: 10 })
      .catch(e => e);

    expect((error as { status?: number }).status).toBe(404);
  });

  it('lists the fields that could still be added to a screen', async () => {
    if (!permitted) return;

    const screens = await client.screens.getScreens({ maxResults: 1 });
    const screen = screens.values?.[0];

    if (!screen) return;

    const available = await client.screens
      .getAvailableScreenFields({ screenId: screen.id! })
      .catch((e: unknown) => e);

    if (available instanceof Error) return;

    expect(Array.isArray(available)).toBe(true);
  });

  it('fails typed on the site-wide write, without ever aiming it at a real field', async () => {
    const error = await client.screens
      .addFieldToDefaultScreen({ fieldId: 'customfield_99999999' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
