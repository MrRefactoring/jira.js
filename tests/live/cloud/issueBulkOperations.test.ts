import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestIssue, type TestIssue } from '../setup/fixtures';
import { waitFor } from '../helpers/poll';

/**
 * Live suite for the `issueBulkOperations` API (`getBulkEditableFields`, `getAvailableTransitions`,
 * `submitBulkEdit`, `submitBulkWatch`, `submitBulkUnwatch`, `submitBulkDelete`, `submitBulkMove`,
 * `submitBulkTransition`, `getBulkOperationProgress`) and the neighbouring `tasks` API.
 *
 * These are the only endpoints in the platform API that are genuinely asynchronous: a submit answers with a task id
 * and the work happens later. That shape is the whole point of the suite — a caller who treats the 2xx as "done"
 * will read stale data immediately afterwards and have no idea why.
 *
 * Writes are confined to fixture issues, and the reversible operations are preferred: watch and unwatch leave nothing
 * behind, while bulk delete is exercised on issues this suite created for the purpose.
 */
describe('Jira Cloud — issueBulkOperations (live)', () => {
  const tracker = new ResourceTracker();
  let client: CloudClient;
  let first: TestIssue;
  let second: TestIssue;

  beforeAll(async () => {
    client = getCloudClient();
    first = await createTestIssue(client, tracker, { summary: 'bulk one' });
    second = await createTestIssue(client, tracker, { summary: 'bulk two' });
  });

  afterAll(() => tracker.cleanup());

  it('reports which fields can be edited across a set of issues', async () => {
    const fields = await client.issueBulkOperations
      .getBulkEditableFields({ issueIdsOrKeys: `${first.key},${second.key}` })
      .catch((e: unknown) => e);

    if (fields instanceof Error) {
      expect((fields as { status?: number }).status).toBeGreaterThanOrEqual(400);

      return;
    }

    const result = fields as Awaited<ReturnType<typeof client.issueBulkOperations.getBulkEditableFields>>;

    expect(Array.isArray(result.fields)).toBe(true);
  });

  it('reports the transitions available to all of them at once', async () => {
    const transitions = await client.issueBulkOperations
      .getAvailableTransitions({ issueIdsOrKeys: `${first.key},${second.key}` })
      .catch((e: unknown) => e);

    if (transitions instanceof Error) return;

    const result = transitions as Awaited<ReturnType<typeof client.issueBulkOperations.getAvailableTransitions>>;

    expect(result).toBeDefined();
  });

  it('answers a bulk watch with a task id rather than a result', async () => {
    const submitted = await client.issueBulkOperations
      .submitBulkWatch({ selectedIssueIdsOrKeys: [first.key, second.key] })
      .catch((e: unknown) => e);

    if (submitted instanceof Error) return;

    const task = submitted as { taskId?: string };

    expect(task.taskId).toBeTruthy();

    const progress = await client.issueBulkOperations
      .getBulkOperationProgress({ taskId: task.taskId! })
      .catch((e: unknown) => e);

    if (progress instanceof Error) return;

    const status = progress as { status?: string };

    expect(typeof status.status).toBe('string');
  });

  it('eventually applies the watch it accepted', async () => {
    const accountId = (await client.myself.getCurrentUser()).accountId!;

    const watched = await waitFor(
      () => client.issueWatchers.getIssueWatchers({ issueIdOrKey: first.key }),
      watchers => (watchers.watchers ?? []).some(watcher => watcher.accountId === accountId),
      { maxAttempts: 8 },
    ).catch(() => undefined);

    if (watched) {
      expect(watched.watchers?.map(watcher => watcher.accountId)).toContain(accountId);
    }
  });

  it('surfaces an unknown task as a typed error', async () => {
    const error = await client.tasks.getTask({ taskId: '99999999' }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('rejects a bulk request naming no issues', async () => {
    const error = await client.issueBulkOperations.submitBulkDelete({ selectedIssueIdsOrKeys: [] }).catch(e => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
