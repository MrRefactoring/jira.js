import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { hasCloudAdminPermission } from '../setup/permissions';

/**
 * Live suite for the `screenSchemes`, `screenTabs` and `screenTabFields` APIs — the three layers between a field and
 * the form a user actually sees.
 *
 * Read-only. The chain is issue type screen scheme → screen scheme → screen → tab → field, and every link is shared
 * configuration: one screen serves many projects, so moving a field on a tab moves it for all of them. There is no
 * project-scoped variant of any of it.
 *
 * Covering the three modules together is deliberate. Individually each is a thin listing; what is worth asserting is
 * that the chain resolves end to end, because a break anywhere in it is what makes a correctly configured field
 * invisible.
 */
describe('Jira Cloud — screen schemes, tabs and fields (live, read-only)', () => {
  let client: CloudClient;
  let permitted = false;

  beforeAll(async () => {
    client = getCloudClient();
    permitted = await hasCloudAdminPermission(client);
  });

  beforeEach(ctx => {
    ctx.skip(!permitted, 'the account lacks the ADMINISTER permission required by this suite');
  });

  it('pages the screen scheme listing', async () => {
    const page = await client.screenSchemes.getScreenSchemes({ maxResults: 5 });

    expect(Array.isArray(page.values)).toBe(true);
    expect(page.values!.length).toBeGreaterThan(0);
    expect(page.maxResults).toBe(5);

    for (const scheme of page.values ?? []) {
      expect(typeof scheme.id).toBe('number');
      expect(typeof scheme.name).toBe('string');
      expect(scheme.screens?.default).toBeTruthy();
    }
  });

  it('resolves a screen scheme down to a screen that exists', async () => {
    const schemes = await client.screenSchemes.getScreenSchemes({ maxResults: 1 });
    const scheme = schemes.values?.[0];

    expect(scheme, 'the site needs a screen scheme').toBeDefined();

    const screenId = scheme!.screens!.default!;
    expect(screenId).toBeGreaterThan(0);
    const screens = await client.screens.getScreens({ id: [screenId], maxResults: 1 });

    expect(screens.values?.[0]?.id).toBe(screenId);
  });

  it('lists the tabs of that screen', async () => {
    const schemes = await client.screenSchemes.getScreenSchemes({ maxResults: 1 });
    const screenId = schemes.values?.[0]?.screens?.default;

    expect(screenId, 'the screen scheme needs a default screen').toBeDefined();

    const list = await client.screenTabs.getAllScreenTabs({ screenId: screenId! });

    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);

    for (const tab of list) {
      expect(typeof tab.id).toBe('number');
      expect(typeof tab.name).toBe('string');
    }
  });

  it('lists the fields on a tab, which is where the chain finally ends', async () => {
    const schemes = await client.screenSchemes.getScreenSchemes({ maxResults: 1 });
    const screenId = schemes.values?.[0]?.screens?.default;

    expect(screenId, 'the screen scheme needs a default screen').toBeDefined();

    const tabs = await client.screenTabs.getAllScreenTabs({ screenId: screenId! });
    const tabId = tabs?.[0]?.id;

    expect(tabId, 'the default screen needs a tab').toBeDefined();

    const fields = await client.screenTabFields.getAllScreenTabFields({ screenId: screenId!, tabId: tabId! });

    expect(Array.isArray(fields)).toBe(true);
    expect(fields.length).toBeGreaterThan(0);

    for (const field of fields) {
      expect(typeof field.id).toBe('string');
      expect(typeof field.name).toBe('string');
    }
  });

  it('fails typed on the destructive path, without ever aiming it at a real scheme', async () => {
    const error = await client.screenSchemes.deleteScreenScheme({ screenSchemeId: '99999999' }).catch(e => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
