import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `issueNotificationSchemes` API (`getNotificationSchemes`,
 * `getNotificationSchemeToProjectMappings`, `getNotificationScheme`, `addNotifications`,
 * `removeNotificationFromNotificationScheme`).
 *
 * Read-only. A notification scheme decides who receives mail when an issue changes, and it is shared across projects.
 * Adding a notification is how you accidentally start sending mail to a group that never asked for it — the one
 * category of configuration write whose blast radius reaches people's inboxes rather than a database.
 *
 * The read half is worth pinning because the shape is unusual: notifications hang off *events*, and the same holder
 * can appear under many of them, so the useful unit is the event-to-holder pairing rather than a flat list.
 */
describe('Jira Cloud — issueNotificationSchemes (live, read-only)', () => {
  let client: CloudClient;
  let schemeId: number | undefined;
  let permitted = true;

  beforeAll(async () => {
    client = getCloudClient();

    const page = await client.issueNotificationSchemes.getNotificationSchemes({ maxResults: '5' }).catch(() => undefined);

    if (!page) {
      permitted = false;

      return;
    }

    schemeId = page.values?.[0]?.id;
  });

  it('pages the scheme listing, or refuses typed without rights', async () => {
    if (!permitted) {
      const error = await client.issueNotificationSchemes.getNotificationSchemes({}).catch((e: unknown) => e);

      expect(isForbiddenError(error) || (error as { status?: number }).status === 401).toBe(true);

      return;
    }

    // Pagination typed as strings again, like `searchPriorities` — numbers
    // everywhere else in the API, strings on this one.
    const page = await client.issueNotificationSchemes.getNotificationSchemes({ maxResults: '2' });

    expect(Array.isArray(page.values)).toBe(true);
    expect(page.maxResults).toBe(2);
    expect(typeof page.isLast).toBe('boolean');

    for (const scheme of page.values ?? []) {
      expect(typeof scheme.id).toBe('number');
      expect(typeof scheme.name).toBe('string');
    }
  });

  it('returns the notification events only when expanded', async () => {
    if (!permitted || schemeId === undefined) return;

    const plain = await client.issueNotificationSchemes.getNotificationScheme({ id: schemeId });
    const expanded = await client.issueNotificationSchemes.getNotificationScheme({
      id: schemeId,
      expand: ['all'],
    });

    expect(plain.notificationSchemeEvents).toBeUndefined();
    // Unlike permission schemes, where the grants arrive unasked, here the
    // content really is behind `expand` — the two sibling APIs disagree.
    expect(Array.isArray(expanded.notificationSchemeEvents)).toBe(true);
  });

  it('pairs each event with the holders that get notified', async () => {
    if (!permitted || schemeId === undefined) return;

    const scheme = await client.issueNotificationSchemes.getNotificationScheme({ id: schemeId, expand: ['all'] });

    for (const event of scheme.notificationSchemeEvents ?? []) {
      expect(event.event?.id).toBeTruthy();
      expect(Array.isArray(event.notifications)).toBe(true);

      for (const notification of event.notifications ?? []) {
        // `notificationType` is the holder kind — CurrentAssignee, Group,
        // ProjectRole and so on. It is what decides whether `parameter` means
        // a group name, a role id, or nothing at all.
        expect(typeof notification.notificationType).toBe('string');
      }
    }
  });

  it('maps schemes to the projects using them', async () => {
    if (!permitted) return;

    const mappings = await client.issueNotificationSchemes
      .getNotificationSchemeToProjectMappings({})
      .catch((e: unknown) => e);

    if (mappings instanceof Error) return;

    const page = mappings as Awaited<
      ReturnType<typeof client.issueNotificationSchemes.getNotificationSchemeToProjectMappings>
    >;

    expect(Array.isArray(page.values)).toBe(true);

    for (const mapping of page.values ?? []) {
      // The mapping is many-to-one: several projects share one scheme, which is
      // precisely why editing a scheme is not a project-local act.
      expect(mapping.notificationSchemeId).toBeTruthy();
      expect(mapping.projectId).toBeTruthy();
    }
  });

  it('surfaces an unknown scheme as a typed error', async () => {
    const error = await client.issueNotificationSchemes
      .getNotificationScheme({ id: 99999999 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error)).toBe(true);
  });

  it('fails typed on the write, without ever aiming it at a real scheme', async () => {
    // Never a real scheme id: a notification added here reaches somebody's
    // inbox, which is not a side effect a test run gets to have.
    const error = await client.issueNotificationSchemes
      .addNotifications({ id: '99999999', notificationSchemeEvents: [] })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
