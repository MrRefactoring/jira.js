import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `auditRecords` API (`getAuditRecords`).
 *
 * One endpoint, administrator-only, and read-only by nature — there is no way to write an audit record through the
 * API, which is the point of an audit log.
 *
 * Two things make it worth its own file. Its pagination is unlike anything else in the API: `offset` and `limit`
 * rather than `startAt` and `maxResults`, so paging code copied from a neighbouring endpoint silently reads page one
 * forever. And its date filters are strings in a format the parameter type does nothing to constrain.
 */
describe('Jira Cloud — auditRecords (live, admin-gated)', () => {
  let client: CloudClient;
  let permitted = false;

  beforeAll(async () => {
    client = getCloudClient();

    permitted = await client.auditRecords
      .getAuditRecords({ limit: 1 })
      .then(() => true)
      .catch(() => false);
  });

  it('returns audit records for an administrator, each fully typed', async () => {
    if (!permitted) return;

    const page = await client.auditRecords.getAuditRecords({ limit: 5 });

    expect(Array.isArray(page.records)).toBe(true);
    expect(typeof page.total).toBe('number');

    for (const record of page.records ?? []) {
      expect(typeof record.id).toBe('number');
      expect(typeof record.summary).toBe('string');
      // `created` is a datetime the models coerce; `category` is what a reader
      // filters on to find, say, permission changes.
      expect(record.created).toBeInstanceOf(Date);
      expect(typeof record.category).toBe('string');
    }
  });

  it('fails typed rather than silently empty without admin rights', async () => {
    if (permitted) return;

    const error = await client.auditRecords.getAuditRecords({ limit: 1 }).catch((e: unknown) => e);

    // The dangerous alternative would be an empty list, which reads as "nothing
    // happened" — the worst possible answer from an audit log.
    expect(isForbiddenError(error) || (error as { status?: number }).status === 401).toBe(true);
  });

  it('pages with offset and limit, not startAt and maxResults', async () => {
    if (!permitted) return;

    const first = await client.auditRecords.getAuditRecords({ limit: 1 });

    expect(first.limit).toBe(1);
    expect(first.offset).toBe(0);
    expect(first.records?.length).toBeLessThanOrEqual(1);

    if ((first.total ?? 0) > 1) {
      const second = await client.auditRecords.getAuditRecords({ limit: 1, offset: 1 });

      expect(second.offset).toBe(1);
      // A moved offset must return a different record, or paging is decorative.
      expect(second.records?.[0]?.id).not.toBe(first.records?.[0]?.id);
    }
  });

  it('narrows the window with from and to', async () => {
    if (!permitted) return;

    const from = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const page = await client.auditRecords.getAuditRecords({ from, limit: 10 });

    expect(Array.isArray(page.records)).toBe(true);

    for (const record of page.records ?? []) {
      expect(record.created!.getTime()).toBeGreaterThanOrEqual(Date.parse(from));
    }
  });

  it('answers a filter that matches nothing with an empty page', async () => {
    if (!permitted) return;

    const page = await client.auditRecords.getAuditRecords({ filter: 'nothingmatchesthisatall', limit: 10 });

    // Empty is a normal answer, not an error — and here it genuinely means
    // "no such activity" rather than "you may not look".
    expect(page.records ?? []).toEqual([]);

    // But `total` ignores the filter entirely: it reports the whole log. Paging
    // arithmetic built on it — "total / limit pages to fetch" — walks through
    // thousands of empty pages for a filter that matches nothing.
    expect(page.total).toBeGreaterThan(0);

    const unfiltered = await client.auditRecords.getAuditRecords({ limit: 1 });

    expect(page.total).toBe(unfiltered.total);
  });
});
