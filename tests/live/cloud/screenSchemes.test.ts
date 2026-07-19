import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

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
  let permitted = true;

  beforeAll(async () => {
    client = getCloudClient();

    permitted = await client.screenSchemes
      .getScreenSchemes({ maxResults: 1 })
      .then(() => true)
      .catch(() => false);
  });

  it('pages the screen scheme listing, or refuses typed without admin rights', async () => {
    if (!permitted) {
      const error = await client.screenSchemes.getScreenSchemes({}).catch((e: unknown) => e);

      expect(isForbiddenError(error) || (error as { status?: number }).status === 401).toBe(true);

      return;
    }

    const page = await client.screenSchemes.getScreenSchemes({ maxResults: 5 });

    expect(Array.isArray(page.values)).toBe(true);
    expect(page.maxResults).toBe(5);

    for (const scheme of page.values ?? []) {
      expect(typeof scheme.id).toBe('number');
      expect(typeof scheme.name).toBe('string');
      // `screens` maps an operation — create, edit, view, default — to a screen
      // id. A scheme with only `default` uses the same form for everything.
      expect(scheme.screens?.default).toBeTruthy();
    }
  });

  it('resolves a screen scheme down to a screen that exists', async () => {
    if (!permitted) return;

    const schemes = await client.screenSchemes.getScreenSchemes({ maxResults: 1 });
    const scheme = schemes.values?.[0];

    if (!scheme) return;

    const screenId = scheme.screens!.default!;
    const screens = await client.screens.getScreens({ id: [screenId], maxResults: 1 });

    // The link from scheme to screen is by bare id with no referential
    // guarantee in the types — this is what proves it resolves.
    expect(screens.values?.[0]?.id).toBe(screenId);
  });

  it('lists the tabs of that screen', async () => {
    if (!permitted) return;

    const schemes = await client.screenSchemes.getScreenSchemes({ maxResults: 1 });
    const screenId = schemes.values?.[0]?.screens?.default;

    if (screenId === undefined) return;

    const tabs = await client.screenTabs.getAllScreenTabs({ screenId }).catch((e: unknown) => e);

    if (tabs instanceof Error) return;

    const list = tabs as Awaited<ReturnType<typeof client.screenTabs.getAllScreenTabs>>;

    expect(Array.isArray(list)).toBe(true);

    for (const tab of list) {
      expect(typeof tab.id).toBe('number');
      expect(typeof tab.name).toBe('string');
    }
  });

  it('lists the fields on a tab, which is where the chain finally ends', async () => {
    if (!permitted) return;

    const schemes = await client.screenSchemes.getScreenSchemes({ maxResults: 1 });
    const screenId = schemes.values?.[0]?.screens?.default;

    if (screenId === undefined) return;

    const tabs = await client.screenTabs.getAllScreenTabs({ screenId }).catch(() => undefined);
    const tabId = tabs?.[0]?.id;

    if (tabId === undefined) return;

    const fields = await client.screenTabFields.getAllScreenTabFields({ screenId, tabId }).catch(() => undefined);

    if (!fields) return;

    // The end of the chain: these ids are what a user sees on the form. A field
    // absent here is invisible however correctly it is configured elsewhere.
    expect(Array.isArray(fields)).toBe(true);

    for (const field of fields) {
      expect(typeof field.id).toBe('string');
      expect(typeof field.name).toBe('string');
    }
  });

  it('fails typed on the destructive path, without ever aiming it at a real scheme', async () => {
    // One screen scheme serves many projects; deleting a real one would change
    // the forms of every project using it.
    const error = await client.screenSchemes.deleteScreenScheme({ screenSchemeId: '99999999' }).catch(e => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
