import { describe, test } from 'vitest';
import { Constants } from '@tests/integration/constants';
import { getVersion3Client } from '@tests/integration/utils';
import type { CreatedIssue } from '@jirajs/version3/models';

describe.sequential('IssueBulkOperations', () => {
  const client = getVersion3Client();
  let createdIssues: CreatedIssue[] = [];

  test.sequential('should create test issues', async ({ expect }) => {
    function createIssue(num: number) {
      return client.issues.createIssue({
        fields: {
          summary: `${Constants.testIssueSummary} ${num}`,
          issuetype: { name: 'Task' },
          project: { key: Constants.testProjectKey },
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    text: `${Constants.testIssueDescription} ${num}`,
                    type: 'text',
                  },
                ],
              },
            ],
          },
        },
      });
    }

    createdIssues = await Promise.all([createIssue(1), createIssue(2)]);

    expect(createdIssues).toHaveLength(2);
    expect(createdIssues[0].key).toContain(Constants.testProjectKey);
    expect(createdIssues[1].key).toContain(Constants.testProjectKey);
  });

  test.sequential('should get available transitions for multiple issues', async ({ expect }) => {
    const result = await client.issueBulkOperations.getAvailableTransitions({
      issueIdsOrKeys: createdIssues.map(issue => issue.key),
    });

    expect(result).toBeDefined();
    expect(result.availableTransitions).toBeDefined();
    expect(Array.isArray(result.availableTransitions)).toBeTruthy();

    if (result.availableTransitions && result.availableTransitions.length > 0) {
      const firstWorkflow = result.availableTransitions[0];

      expect(Array.isArray(firstWorkflow.transitions)).toBeTruthy();
      expect(Array.isArray(firstWorkflow.issues)).toBeTruthy();
      expect(typeof firstWorkflow.isTransitionsFiltered).toBe('boolean');
    }
  });

  test.sequential.skip('should cleanup test issues', async ({ expect }) => {
    const result = await client.issueBulkOperations.submitBulkDelete({
      selectedIssueIdsOrKeys: createdIssues.map(issue => issue.key),
    });

    expect(result).toBeDefined();
    expect(result.taskId).toBeDefined();
  });
});
