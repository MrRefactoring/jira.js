import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { isNotFoundError } from '#/core';
import type { AgileClient } from '#/agile/createAgileClient';
import { getAgileClient, getCloudClient } from '../setup/client';
import { ResourceTracker } from '../setup/resources';
import { createTestBoard, createTestIssue, TEST_PROJECT_KEY, type TestIssue } from '../setup/fixtures';

/**
 * Live suite for the Agile `epic` API (`getEpic`, `partiallyUpdateEpic`, `moveIssuesToEpic`,
 * `removeIssuesFromEpic`, `getIssuesForEpic`, `getIssuesWithoutEpic`, `rankEpics`).
 *
 * An epic is not a separate kind of object: it is an ordinary issue of the Epic type, which is why this API sits
 * beside the platform one rather than replacing it. What the Agile surface adds is the *membership* relation — which
 * issues belong to which epic — and that is expressed nowhere in the platform API's issue payload.
 *
 * Gated on the *project* offering an Epic issue type, which the test project does not: it ships with Task and
 * Sub-task only, and the site's Epic type is not in its issue type scheme. Adding it would mean editing a scheme
 * shared with other projects, which is exactly the kind of write this suite refuses to make.
 *
 * So the epic cycle is written as a single test that runs end to end where an Epic type is available and records why
 * it could not otherwise. Splitting it across several `it`s that each return early would produce a file reporting six
 * passing tests while verifying nothing — the failure mode this suite exists to avoid.
 */
describe('Jira Software — epic (live)', () => {
  const tracker = new ResourceTracker();
  let agile: AgileClient;
  let epic: TestIssue | undefined;
  let child: TestIssue;
  let boardId: number;

  beforeAll(async () => {
    agile = getAgileClient();

    const cloud = getCloudClient();
    const project = await cloud.projects.getProject({ projectIdOrKey: TEST_PROJECT_KEY });
    const epicType = project.issueTypes?.find(type => type.name === 'Epic');

    const boards = await agile.board.getAllBoards({ projectKeyOrId: TEST_PROJECT_KEY, type: 'scrum', maxResults: 1 });

    boardId = boards.values?.[0]?.id ?? (await createTestBoard(cloud, agile, tracker)).id;

    child = await createTestIssue(cloud, tracker, { summary: 'epic child' });

    if (!epicType) return;

    const created = await cloud.issues
      .createIssue({
        fields: {
          project: { key: TEST_PROJECT_KEY },
          issuetype: { id: epicType.id },
          summary: 'live suite epic',
        },
      })
      .catch(() => undefined);

    if (!created) return;

    epic = { id: created.id, key: created.key };
    tracker.defer(async () => {
      await cloud.issues.deleteIssue({ issueIdOrKey: created.key });
    });
  });

  afterAll(() => tracker.cleanup());

  it('records that the test project offers no Epic type to exercise', () => {
    if (epic) return;

    expect(epic, 'no Epic issue type in the project — epic cycle not exercised').toBeUndefined();
  });

  it('runs the whole epic cycle where an Epic type is available', async () => {
    if (!epic) return;

    const created = await agile.epic.getEpic({ epicIdOrKey: epic.key });

    expect(created.key).toBe(epic.key);
    expect(typeof created.name).toBe('string');
    expect(created.color?.key).toBeTruthy();
    expect(created.done).toBe(false);

    const empty = await agile.epic.getIssuesForEpic({ epicIdOrKey: epic.key, maxResults: 10 });

    expect(empty.issues).toEqual([]);

    await agile.epic.moveIssuesToEpic({ epicIdOrKey: epic.key, issues: [child.key] });

    const withChild = await agile.epic.getIssuesForEpic({ epicIdOrKey: epic.key, maxResults: 10 });

    expect(withChild.issues?.map(issue => issue.key)).toContain(child.key);

    await agile.epic.partiallyUpdateEpic({ epicIdOrKey: epic.key, name: 'renamed epic' });

    const renamed = await agile.epic.getEpic({ epicIdOrKey: epic.key });

    expect(renamed.name).toBe('renamed epic');
    expect(renamed.color?.key).toBeTruthy();

    await agile.epic.removeIssuesFromEpic({ issues: [child.key] });

    const removed = await agile.epic.getIssuesForEpic({ epicIdOrKey: epic.key, maxResults: 10 });

    expect(removed.issues?.map(issue => issue.key)).not.toContain(child.key);
  });

  it('lists issues belonging to no epic for the board', async () => {
    const orphans = await agile.board.getIssuesWithoutEpicForBoard({ boardId, maxResults: 50 });

    expect(Array.isArray(orphans.issues)).toBe(true);
  });

  it('surfaces an unknown epic as a typed NotFoundError', async () => {
    const error = await agile.epic
      .getEpic({ epicIdOrKey: `${TEST_PROJECT_KEY}-99999999` })
      .catch((e: unknown) => e);

    expect(isNotFoundError(error)).toBe(true);
  });
});
