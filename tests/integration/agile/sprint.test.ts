import { afterAll, beforeAll, test } from 'vitest';
import { AgileModels } from '../../../src/index.js';
import { Constants } from '../constants.js';
import { createAgileProject, deleteAgileProject, getAgileClient, getVersion3Client } from '../utils/index.js';

const client = getAgileClient();

let board: any;
let sprint: AgileModels.Sprint;

beforeAll(async () => {
  await createAgileProject();
});

afterAll(async () => {
  await deleteAgileProject();
});

test.sequential('should create new sprint', async ({ expect }) => {
  const boards = await client.board.getAllBoards({
    name: Constants.testAgileProjectKey,
  });

  expect(boards.total).toBe(1);

  [board] = boards.values;

  sprint = await client.sprint.createSprint({
    name: 'New sprint',
    originBoardId: board.id,
  });

  expect(!!sprint).toBeTruthy();
  expect(sprint.name).toBe('New sprint');
  expect(sprint.state).toBe('future');
});

test.sequential('should create and move task to sprint', async ({ expect }) => {
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

test.sequential('should return issues for sprint', async ({ expect }) => {
  const { issues } = await client.sprint.getIssuesForSprint({
    sprintId: sprint.id,
  });

  expect(!!issues).toBeTruthy();
  expect(issues[0].fields?.summary).toBe('Test task');
});

test.sequential('should partially update sprint', async ({ expect }) => {
  const newSprint = await client.sprint.partiallyUpdateSprint({
    sprintId: sprint.id,
    state: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + 1000),
  });

  expect(newSprint.state).toBe('active');
});

test.sequential('should remove sprint', async ({ expect }) => {
  await client.sprint.deleteSprint({ sprintId: sprint.id });
});
