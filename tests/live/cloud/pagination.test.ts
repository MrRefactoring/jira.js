import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { paginate, type RequestOptions } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import type { SearchIssues } from '#/cloud/parameters';
import { getCloudClient } from '../setup/client';
import { createTestIssue } from '../setup/fixtures';
import { ResourceTracker } from '../setup/resources';
import { runId } from '../helpers/naming';
import { waitFor } from '../helpers/poll';

const labels = [`jjs${runId()}pageone`, `jjs${runId()}pagetwo`].map(value => value.toLowerCase());

describe('Jira Cloud — pagination helper (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let issueIds: number[];

  beforeAll(async () => {
    client = getCloudClient();
    const first = await createTestIssue(client, tracker);
    const second = await createTestIssue(client, tracker);
    issueIds = [Number(first.id), Number(second.id)];
    await client.issues.editIssue({ issueIdOrKey: first.key, fields: { labels } });
  });

  afterAll(() => tracker.cleanup());

  it('reads run-owned labels across offset pages', async () => {
    await waitFor(
      () => client.labels.getAllLabels({ maxResults: 1000 }),
      page => labels.every(label => page.values?.includes(label)),
      { maxAttempts: 8 },
    );
    const found: string[] = [];
    let pages = 0;

    for await (const label of paginate({
      initialParameters: { startAt: 0, maxResults: 1 },
      fetchPage: (parameters, options) => {
        pages += 1;
        return client.labels.getAllLabels(parameters, options);
      },
      getItems: page => page.values ?? [],
      getNextParameters: (page, parameters) =>
        page.isLast || !page.values?.length
          ? undefined
          : { ...parameters, startAt: (page.startAt ?? parameters.startAt) + page.values.length },
    })) {
      found.push(label);
    }

    expect(found).toEqual(expect.arrayContaining(labels));
    expect(new Set(found).size).toBe(found.length);
    expect(pages).toBeGreaterThanOrEqual(2);
  });

  it('reads both run-owned issues using JQL continuation tokens', async () => {
    const initialParameters: SearchIssues = {
      jql: `id IN (${issueIds.join(',')}) ORDER BY id`,
      maxResults: 1,
      reconcileIssues: issueIds,
    };
    await waitFor(
      () => client.issueSearch.searchIssues({ ...initialParameters, maxResults: 2 }),
      page => page.issues?.length === 2,
      { maxAttempts: 8 },
    );
    const found: number[] = [];
    const pageSizes: number[] = [];

    for await (const issue of paginate({
      initialParameters,
      fetchPage: async (parameters: SearchIssues, options: RequestOptions) => {
        const page = await client.issueSearch.searchIssues(parameters, options);
        pageSizes.push(page.issues?.length ?? 0);
        return page;
      },
      getItems: page => page.issues ?? [],
      getNextParameters: (page, parameters) =>
        page.nextPageToken ? { ...parameters, nextPageToken: page.nextPageToken } : undefined,
    })) {
      found.push(Number(issue.id));
    }

    expect(found.sort((a, b) => a - b)).toEqual([...issueIds].sort((a, b) => a - b));
    expect(pageSizes.filter(size => size > 0)).toEqual([1, 1]);
  });
});
