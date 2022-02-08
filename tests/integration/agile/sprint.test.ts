import { AgileModels } from '../../../src';
import { Constants } from '../constants';
import test from 'ava';
import {
  createAgileProject,
  deleteAgileProject,
  getAgileClient,
  getVersion3Client,
} from '../utils';

const client = getAgileClient();

let board: any;
let sprint: AgileModels.Sprint;

test.before(async () => {
  await createAgileProject();
});

test.after(async () => {
  await deleteAgileProject();
});

test.serial('should create new sprint', async t => {
  const boards = await client.board.getAllBoards({ name: Constants.testAgileProjectKey });

  t.is(boards.total, 1);

  [board] = boards.values;

  sprint = await client.sprint.createSprint({
    name: 'New sprint',
    originBoardId: board.id,
  });

  t.truthy(!!sprint);
  t.is(sprint.name, 'New sprint');
  t.is(sprint.state, AgileModels.Sprint.State.Future);
});

test.serial('should create and move task to sprint', async t => {
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

  t.truthy(!!issue);
});

test.serial('should return issues for sprint', async t => {
  const { issues } = await client.sprint.getIssuesForSprint({
    sprintId: sprint.id,
  });

  t.truthy(!!issues);
  t.is(issues[0].fields?.summary, 'Test task');
});

test.serial('should partially update sprint', async t => {
  const newSprint = await client.sprint.partiallyUpdateSprint({
    sprintId: sprint.id,
    state: AgileModels.Sprint.State.Active,
    startDate: new Date(),
    endDate: new Date(Date.now() + 1000),
  });

  t.is(newSprint.state, AgileModels.Sprint.State.Active);
});

test.serial('should remove sprint', async t => {
  await client.sprint.deleteSprint({
    sprintId: sprint.id,
  });

  t.pass();
});
