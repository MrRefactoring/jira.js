import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `issueFields` API (`getFields`, `getFieldsPaginated`, `getTrashedFieldsPaginated`, and the
 * custom-field create/update/trash/restore/delete group).
 *
 * Read-only. A custom field is site-wide: creating one adds a column to every project's configuration, and Jira caps
 * how many a site may have. Trashing and deleting are worse — a deleted field takes its data on every issue with it.
 * None of that belongs in a suite running against a working site.
 *
 * What is worth asserting is the field catalogue itself, because the rest of the API is addressed through it. Field
 * *ids* are what `fields` parameters and JQL clauses ultimately resolve to, and the mapping from a human name to an
 * id is neither stable nor unique — two custom fields may share a name.
 */
describe('Jira Cloud — issueFields (live, read-only)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('lists every field on the site, each fully typed', async () => {
    const fields = await client.issueFields.getFields();

    expect(fields.length).toBeGreaterThan(0);

    for (const field of fields) {
      expect(typeof field.id).toBe('string');
      expect(typeof field.name).toBe('string');
      expect(typeof field.custom).toBe('boolean');
      expect(typeof field.searchable).toBe('boolean');
      expect(typeof field.orderable).toBe('boolean');
    }
  });

  it('includes the system fields the rest of the suite reads', async () => {
    const fields = await client.issueFields.getFields();
    const ids = fields.map(field => field.id);

    expect(ids).toEqual(expect.arrayContaining(['summary', 'description', 'issuetype', 'project', 'status']));
  });

  it('distinguishes custom fields by an id that is not their name', async () => {
    const fields = await client.issueFields.getFields();
    const custom = fields.filter(field => field.custom);

    for (const field of custom) {
      expect(field.id).toMatch(/^customfield_\d+$/);
      expect(field.schema?.customId).toBeTruthy();
    }

    const system = fields.filter(field => !field.custom);

    expect(system.every(field => !field.id!.startsWith('customfield_'))).toBe(true);
  });

  it('describes what each field holds through its schema', async () => {
    const fields = await client.issueFields.getFields();
    const summary = fields.find(field => field.id === 'summary')!;

    expect(summary.schema?.type).toBe('string');

    const issuetype = fields.find(field => field.id === 'issuetype')!;

    expect(issuetype.schema?.type).toBe('issuetype');
    expect(summary.schema?.items).toBeUndefined();
  });

  it('pages the custom-field listing for an admin, or fails typed', async () => {
    const result = await client.issueFields.getFieldsPaginated({ maxResults: 5 }).catch((e: unknown) => e);

    if (result instanceof Error) {
      expect(isForbiddenError(result)).toBe(true);

      return;
    }

    const page = result as Awaited<ReturnType<typeof client.issueFields.getFieldsPaginated>>;

    expect(page.maxResults).toBe(5);
    expect(page.values?.length).toBeLessThanOrEqual(5);
    expect(typeof page.isLast).toBe('boolean');
  });

  it('filters the paginated listing to custom fields only', async () => {
    const result = await client.issueFields
      .getFieldsPaginated({ type: ['custom'], maxResults: 50 })
      .catch((e: unknown) => e);

    if (result instanceof Error) return;

    const page = result as Awaited<ReturnType<typeof client.issueFields.getFieldsPaginated>>;

    for (const field of page.values ?? []) expect(field.id).toMatch(/^customfield_\d+$/);
  });

  it('fails typed on the destructive path, without ever aiming it at a real field', async () => {
    const error = await client.issueFields.deleteCustomField({ id: 'customfield_99999999' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error) || (error as { status?: number }).status === 400).toBe(
      true,
    );
  });
});
