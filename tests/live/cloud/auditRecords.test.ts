import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { isNotEntitled } from '../setup/entitlement';

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
  let entitled = true;

  beforeAll(async () => {
    client = getCloudClient();

    // Two different refusals wear the same 403, and the suite asserts opposite things about them: a site whose plan
    // has no audit log at all, and an administrator-only endpoint reached without administrator rights.
    const probe = await client.auditRecords.getAuditRecords({ limit: 1 }).catch((e: unknown) => e);

    permitted = !(probe instanceof Error);
    entitled = !isNotEntitled(probe);
  });

  it('returns audit records for an administrator, each fully typed', async ctx => {
    ctx.skip(!entitled, 'the site is on a Free plan, which has no audit log');
    ctx.skip(!permitted, 'the account is not a Jira administrator');

    const page = await client.auditRecords.getAuditRecords({ limit: 5 });

    expect(Array.isArray(page.records)).toBe(true);
    expect(typeof page.total).toBe('number');

    for (const record of page.records ?? []) {
      expect(typeof record.id).toBe('number');
      expect(typeof record.summary).toBe('string');
      expect(record.created).toBeInstanceOf(Date);
      expect(typeof record.category).toBe('string');
    }
  });

  it('fails typed rather than silently empty without admin rights', async ctx => {
    ctx.skip(!entitled, 'the site is on a Free plan, so the refusal names the plan rather than the missing rights');
    ctx.skip(permitted, 'the account is a Jira administrator, so there is no refusal to inspect');

    const error = await client.auditRecords.getAuditRecords({ limit: 1 }).catch((e: unknown) => e);

    expect(isForbiddenError(error) || (error as { status?: number }).status === 401).toBe(true);
  });

  it('pages with offset and limit, not startAt and maxResults', async ctx => {
    ctx.skip(!entitled, 'the site is on a Free plan, which has no audit log');
    ctx.skip(!permitted, 'the account is not a Jira administrator');

    const first = await client.auditRecords.getAuditRecords({ limit: 1 });

    expect(first.limit).toBe(1);
    expect(first.offset).toBe(0);
    expect(first.records?.length).toBeLessThanOrEqual(1);

    if ((first.total ?? 0) > 1) {
      const second = await client.auditRecords.getAuditRecords({ limit: 1, offset: 1 });

      expect(second.offset).toBe(1);
      expect(second.records?.[0]?.id).not.toBe(first.records?.[0]?.id);
    }
  });

  it('narrows the window with from and to', async ctx => {
    ctx.skip(!entitled, 'the site is on a Free plan, which has no audit log');
    ctx.skip(!permitted, 'the account is not a Jira administrator');

    const from = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const page = await client.auditRecords.getAuditRecords({ from, limit: 10 });

    expect(Array.isArray(page.records)).toBe(true);

    for (const record of page.records ?? []) {
      expect(record.created!.getTime()).toBeGreaterThanOrEqual(Date.parse(from));
    }
  });

  it('answers a filter that matches nothing with an empty page', async ctx => {
    ctx.skip(!entitled, 'the site is on a Free plan, which has no audit log');
    ctx.skip(!permitted, 'the account is not a Jira administrator');

    const page = await client.auditRecords.getAuditRecords({ filter: 'nothingmatchesthisatall', limit: 10 });

    expect(page.records ?? []).toEqual([]);

    expect(page.total).toBeGreaterThan(0);

    const unfiltered = await client.auditRecords.getAuditRecords({ limit: 1 });

    expect(page.total).toBe(unfiltered.total);
  });
});
