/**
 * Disposable Jira resources for live suites.
 *
 * Issues are created in an existing project rather than a fresh one: creating a Jira project is slow, consumes a
 * licence slot, and often cannot be deleted cleanly by the same token that made it. A dedicated test project is the
 * cheaper and more reliable unit of isolation, and run-scoped names keep concurrent runs apart inside it.
 */
import type { CloudClient } from '#/cloud/createCloudClient';
import type { Document } from '#/cloud/models/document';
import type { AgileClient } from '#/agile/createAgileClient';
import type { ResourceTracker } from './resources';
import { testName } from '../helpers/naming';

/** The project every live suite works in. Its issue types are `Task` and `Sub-task`. */
export const TEST_PROJECT_KEY = 'AUTOTEST';

/** The issue type used unless a suite needs something else. */
export const TEST_ISSUE_TYPE = 'Task';

export interface TestIssue {
  id: string;
  key: string;
}

/**
 * A minimal ADF document wrapping one line of text.
 *
 * Typed as the library's own `Document` rather than a hand-written shape, so a suite passing this
 * to an endpoint is checking the real contract instead of a lookalike that happens to satisfy it.
 */
export function documentOf(text: string): Document {
  return {
    type: 'doc',
    version: 1,
    content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
  };
}

/**
 * Create an issue and register its deletion.
 *
 * `description` accepts either shape on purpose — passing a string is what exercises the wiki-markup routing, and a
 * suite that wants the plain v3 path passes a document.
 */
export async function createTestIssue(
  client: CloudClient,
  tracker: ResourceTracker,
  options: { summary?: string; description?: string | ReturnType<typeof documentOf> } = {},
): Promise<TestIssue> {
  const created = await client.issues.createIssue({
    fields: {
      project: { key: TEST_PROJECT_KEY },
      issuetype: { name: TEST_ISSUE_TYPE },
      summary: options.summary ?? testName('issue'),
      ...(options.description ? { description: options.description } : {}),
    },
  });

  tracker.defer(async () => {
    await client.issues.deleteIssue({ issueIdOrKey: created.key });
  });

  return { id: created.id, key: created.key };
}

export interface TestBoard {
  id: number;
  filterId: number;
}

/**
 * Create a scrum board over a filter scoped to the test project, and register both for deletion.
 *
 * The Agile suites need a board to have anything to assert against, and the test project ships without one. Making a
 * board is safe in a way most Agile configuration is not: it is scoped to the filter and project behind it, it is
 * deletable by whoever made it, and nothing outside this suite reads it. The filter comes first because a board is,
 * fundamentally, a saved filter with columns.
 */
export async function createTestBoard(
  client: CloudClient,
  agile: AgileClient,
  tracker: ResourceTracker,
): Promise<TestBoard> {
  const filter = await client.filters.createFilter({
    name: testName('board filter'),
    jql: `project = ${TEST_PROJECT_KEY} ORDER BY Rank ASC`,
  });

  const filterId = Number(filter.id);

  tracker.defer(async () => {
    await client.filters.deleteFilter({ id: filterId });
  });

  const board = await agile.board.createBoard({
    name: testName('board').slice(0, 40),
    type: 'scrum',
    filterId,
    location: { type: 'project', projectKeyOrId: TEST_PROJECT_KEY },
  });

  tracker.defer(async () => {
    await agile.board.deleteBoard({ boardId: board.id! });
  });

  return { id: board.id!, filterId };
}
