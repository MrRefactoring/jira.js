import { describe, test } from 'vitest';
import type { AgileModels } from '@jirajs';
import { Constants } from '@tests/integration/constants';
import {
  getAgileClient,
  getVersion3Client,
} from '@tests/integration/utils';

describe.sequential('Sprint', () => {
  const client = getAgileClient();

  let board: AgileModels.Board | undefined;
  let sprint: AgileModels.Sprint;

  test.sequential.skip('should create new sprint', async ({ expect }) => {
    const boards = await client.board.getAllBoards({ name: Constants.testAgileProjectKey });

    expect(boards.total).toBe(1);

    [board] = boards.values;

    // @ts-expect-error Wrong typings
    sprint = await client.sprint.createSprint({
      name: 'New sprint',
      // @ts-expect-error Wrong typings
      originBoardId: board.id,
    });

    expect(!!sprint).toBeTruthy();
    expect(sprint.name).toBe('New sprint');
    expect(sprint.state).toBe('future');
  });

  test.sequential.skip('should create and move task to sprint', async ({ expect }) => {
    const issue = await getVersion3Client().issues.createIssue({
      fields: {
        summary: 'Test task',
        project: {
          key: Constants.testAgileProjectKey,
        },
        issuetype: {
          name: 'Task',
        },
      },
    });

    await client.backlog.moveIssuesToBacklog({
      issues: [issue.key],
    });

    await client.sprint.moveIssuesToSprintAndRank({
      sprintId: sprint.id,
      issues: [issue.key],
    });

    expect(!!issue).toBeTruthy();
  });

  test.sequential.skip('should return issues for sprint', async ({ expect }) => {
    const { issues } = await client.sprint.getIssuesForSprint({
      sprintId: sprint.id,
    });

    expect(!!issues).toBeTruthy();
    expect(issues[0].fields?.summary).toBe('Test task');
  });

  test.sequential.skip('should partially update sprint', async ({ expect }) => {
    const newSprint = await client.sprint.partiallyUpdateSprint({
      sprintId: sprint.id,
      state: 'active',
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000),
    });

    expect(newSprint.state).toBe('active');
  });

  test.sequential.skip('should remove sprint', async () => {
    await client.sprint.deleteSprint({ sprintId: sprint.id });
  });
});
