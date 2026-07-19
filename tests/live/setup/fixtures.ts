/**
 * Disposable Jira resources for live suites.
 *
 * Issues are created in an existing project rather than a fresh one: creating a Jira project is slow, consumes a
 * licence slot, and often cannot be deleted cleanly by the same token that made it. A dedicated test project is the
 * cheaper and more reliable unit of isolation, and run-scoped names keep concurrent runs apart inside it.
 */
import type { CloudClient } from '#/cloud/createCloudClient';
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

/** A minimal ADF document wrapping one line of text. */
export function documentOf(text: string): { type: 'doc'; version: 1; content: unknown[] } {
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
    // Deleting needs a project permission the test token may not hold. Where it
    // does not, the issue stays — better a visible leftover in a test project
    // than a suite that fails on cleanup rights rather than on the behaviour it
    // is testing. Grant "Delete Issues" in the project to get real teardown.
    await client.issues.deleteIssue({ issueIdOrKey: created.key });
  });

  return { id: created.id, key: created.key };
}
