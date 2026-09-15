import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest';
import { createCloudClient } from '#/cloud/createCloudClient';
import { createAgileClient } from '#/agile/createAgileClient';
import { IssueSchema, type Issue, type TimeTrackingProvider } from '#/cloud/models';
import type { MoveIssuesToBoard } from '#/agile/models';

const UNRESOLVED_ISSUE = {
  id: '20511',
  key: 'AUTOTEST-7677',
  self: 'https://acme.atlassian.net/rest/api/3/issue/20511',
  fields: {
    summary: 'jjs probe nulls',
    created: '2026-09-16T10:00:00.000+0000',
    updated: '2026-09-16T10:00:00.000+0000',
    statuscategorychangedate: '2026-09-16T10:00:00.000+0000',
    labels: [],
    workratio: -1,
    assignee: null,
    reporter: null,
    priority: null,
    resolution: null,
    resolutiondate: null,
    lastViewed: null,
    duedate: null,
    description: null,
    environment: null,
    security: null,
    timespent: null,
    timeestimate: null,
    timeoriginalestimate: null,
    aggregatetimespent: null,
    aggregatetimeestimate: null,
    aggregatetimeoriginalestimate: null,
    customfield_10016: { value: 'three' },
  },
};

function answer(status: number, body?: unknown) {
  vi.stubGlobal('fetch', () =>
    Promise.resolve(
      new Response(body === undefined ? null : JSON.stringify(body), {
        status,
        headers: body === undefined ? {} : { 'content-type': 'application/json' },
      }),
    ),
  );
}

const config = {
  host: 'https://acme.atlassian.net',
  auth: { type: 'basic' as const, email: 'a@b.co', apiToken: 'token' },
  onSchemaMismatch: 'throw' as const,
};

afterEach(() => vi.unstubAllGlobals());

describe('an unresolved issue answers with nulls', () => {
  it('parses without a schema mismatch', () => {
    expect(IssueSchema.safeParse(UNRESOLVED_ISSUE).success).toBe(true);
  });

  it('keeps a null date null instead of coercing it to the epoch', () => {
    const issue = IssueSchema.parse(UNRESOLVED_ISSUE);

    expect(issue.fields?.resolutiondate).toBeNull();
    expect(issue.fields?.lastViewed).toBeNull();
    expect(issue.fields?.created).toBeInstanceOf(Date);
  });

  it('reaches the caller validated, so created is a Date', async () => {
    answer(200, UNRESOLVED_ISSUE);

    const issue = await createCloudClient(config).issues.getIssue({ issueIdOrKey: 'AUTOTEST-7677' });

    expect(issue.fields?.created?.getTime()).toBe(Date.parse('2026-09-16T10:00:00.000+0000'));
  });

  it('reads a custom field the way the migration guide shows, after narrowing it', () => {
    const issue: Issue = IssueSchema.parse(UNRESOLVED_ISSUE);
    const points = (issue.fields?.customfield_10016 as { value: string } | undefined)?.value;

    expect(points).toBe('three');
    expectTypeOf<NonNullable<Issue['fields']>['customfield_10016']>().toEqualTypeOf<unknown>();
    expectTypeOf(IssueSchema).not.toHaveProperty('extend');
  });

  it('types the cleared fields as nullable and leaves undeclared keys reachable', () => {
    expectTypeOf<NonNullable<Issue['fields']>['resolutiondate']>().toEqualTypeOf<Date | null | undefined>();
    expectTypeOf<Issue['renderedFieldsHtml']>().toEqualTypeOf<unknown>();
  });
});

describe('a success without a body resolves to undefined, and the type says so', () => {
  it('getSelectedTimeTrackingImplementation, when time tracking is disabled', async () => {
    answer(204);

    const provider = await createCloudClient(config).timeTracking.getSelectedTimeTrackingImplementation();

    expect(provider).toBeUndefined();
    expectTypeOf(provider).toEqualTypeOf<TimeTrackingProvider | undefined>();
  });

  it('moveIssuesToBoard, when every issue moved', async () => {
    answer(204);

    const moved = await createAgileClient(config).board.moveIssuesToBoard({ boardId: 1, issues: ['AUTOTEST-1'] });

    expect(moved).toBeUndefined();
    expectTypeOf(moved).toEqualTypeOf<MoveIssuesToBoard | undefined>();
  });
});

describe('a pin status read successfully says error: null', () => {
  it('parses under a strict client', async () => {
    answer(200, { moduleId: 'panel', statuses: [{ projectIdOrKey: 'AUTOTEST', pinned: true, error: null }] });

    const result = await createCloudClient(config).issuePanels.getBulkPinStatus({
      moduleId: 'panel',
      projectList: ['AUTOTEST'],
    });

    expect(result.statuses?.[0]?.error).toBeNull();
  });
});
