import {
  createAgileProject,
  deleteAgileProject,
  getAgileClient, getVersion3Client,
} from '../utils';
import { Constants } from '../constants';
import { AgileModels } from '../../../src';

describe('Agile Sprint', () => {
  const client = getAgileClient();

  let board: any;
  let sprint: AgileModels.Sprint;

  beforeAll(async () => {
    jest.setTimeout(Constants.testTimeouts);
    await createAgileProject();
  });

  afterAll(async () => {
    await deleteAgileProject();
  });

  it('should create new sprint', async () => {
    const boards = await client.board.getAllBoards({ name: Constants.testAgileProjectKey });

    expect(boards.total).toBe(1);

    [board] = boards.values;

    sprint = await client.sprint.createSprint({
      name: 'New sprint',
      originBoardId: board.id,
    });

    expect(sprint).toBeDefined();
    expect(sprint.name).toBe('New sprint');
    expect(sprint.state).toBe(AgileModels.Sprint.State.Future);
  });

  it('should create and move task to sprint', async () => {
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

    expect(issue).toBeDefined();
  });

  it('should return issues for sprint', async () => {
    const { issues } = await client.sprint.getIssuesForSprint({
      sprintId: sprint.id,
    });

    expect(issues).toBeDefined();
    expect(issues[0].fields?.summary).toBe('Test task');
  });

  it('should partially update sprint', async () => {
    const newSprint = await client.sprint.partiallyUpdateSprint({
      sprintId: sprint.id,
      state: AgileModels.Sprint.State.Active,
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000),
    });

    expect(newSprint.state).toBe(AgileModels.Sprint.State.Active);
  });

  it('should remove sprint', async () => {
    await client.sprint.deleteSprint({
      sprintId: sprint.id,
    });

    expect(true).toBe(true);
  });
});
