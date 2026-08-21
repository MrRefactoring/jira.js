/**
 * Boards, sprints, epics and the backlog, driven against a real Data Center instance.
 *
 * Unlike Cloud, Data Center publishes its agile endpoints in the same document as the platform ones, so they are part
 * of the same client — and they are the half most likely to be missing from a self-hosted deployment, since a Jira
 * without the Software application refuses all of them outright. Reaching them at all is part of what this proves.
 *
 * The board the Scrum project template creates is shared with the crawl and is not deleted here. Everything else the
 * suite makes, it removes.
 */
import { afterAll, beforeAll, describe, expect, inject, it } from 'vitest';
import type { ServerClient } from '#/server/createServerClient';
import { connect } from './setup/client';
import { serverTestEnv } from './setup/env';
import { touch } from './setup/touch';
import { testName } from '../helpers/naming';

describe('agile', () => {
  const { projectKey } = serverTestEnv();
  const jira: ServerClient = connect();
  const fixtures = inject('serverFixtures');

  let sprintId: number;
  let issueKey: string;

  beforeAll(async () => {
    const sprint = await jira.sprint.createSprint({ name: testName('spr'), originBoardId: fixtures.boardId });

    sprintId = sprint.id!;

    const issue = await jira.issues.createIssue({
      fields: { project: { key: projectKey }, summary: testName('an agile issue'), issuetype: { name: 'Task' } },
    });

    issueKey = issue.key!;
  });

  afterAll(async () => {
    await touch(() => jira.sprint.deleteSprint({ sprintId }));
    await touch(() => jira.issues.deleteIssue({ issueIdOrKey: issueKey }));
  });

  it('creates a board and deletes it', async () => {
    const filter = await jira.filters.createFilter({ name: testName('board filter'), jql: `project = ${projectKey}` });

    // A board needs a filter shared with someone; on a private instance that is everyone signed in.
    await jira.filters.addSharePermission({ id: String(filter.id), type: 'authenticated' });

    const board = await jira.board.createBoard({
      name: testName('a board'),
      type: 'scrum',
      filterId: Number(filter.id),
    });

    expect(board.id).toBeDefined();

    await jira.board.deleteBoard({ boardId: board.id! });
    await jira.filters.deleteFilter({ id: String(filter.id) });
  });

  it('reads the board it was given', async () => {
    const board = await jira.board.getBoard({ boardId: fixtures.boardId });

    expect(board.id).toBe(fixtures.boardId);

    const configuration = await jira.board.getBoardConfiguration({ boardId: fixtures.boardId });

    expect(configuration.id).toBe(fixtures.boardId);

    const boards = await jira.board.getAllBoards();

    expect(boards.values.length).toBeGreaterThan(0);
  });

  it('stores a property on the board', async () => {
    await jira.board.setBoardProperty({
      boardId: fixtures.boardId,
      propertyKey: 'suite',
      body: { written: true },
    });

    const property = await jira.board.getBoardProperty({ boardId: fixtures.boardId, propertyKey: 'suite' });

    expect(property.value).toEqual({ written: true });

    await jira.board.deleteBoardProperty({ boardId: fixtures.boardId, propertyKey: 'suite' });
  });

  it('turns refined velocity on and reads it back', async () => {
    await touch(() => jira.board.setRefinedVelocity({ boardId: fixtures.boardId, value: true }));
    await touch(() => jira.board.getRefinedVelocity({ boardId: fixtures.boardId }));
  });

  it('moves an issue into the sprint, then out to the backlog', async () => {
    await jira.sprint.moveIssuesToSprint({ sprintId, issues: [issueKey] });

    const inSprint = await jira.sprint.getIssuesForSprint({ sprintId });

    expect(inSprint.issues?.some(issue => issue.key === issueKey)).toBe(true);

    await jira.backlog.moveIssuesToBacklog({ issues: [issueKey] });
  });

  it('updates the sprint, wholly and in part', async () => {
    const renamed = testName('spr2');

    await jira.sprint.partiallyUpdateSprint({ sprintId, name: renamed });

    const sprint = await jira.sprint.getSprint({ sprintId });

    expect(sprint.name).toBe(renamed);

    // A full update replaces the sprint, so every field it validates has to be present — `state` among them.
    await jira.sprint.updateSprint({ sprintId, name: renamed, state: 'future', goal: 'proving the write path' });
    await touch(() => jira.sprint.swapSprint({ sprintId, sprintToSwapWith: sprintId }));
    await touch(() => jira.sprint.unmapSprints({ sprintIds: [sprintId] }));
    await touch(() => jira.sprint.unmapAllSprints());
  });

  it('stores a property on the sprint', async () => {
    await jira.sprint.setSprintProperty({ sprintId, propertyKey: 'suite', body: { written: true } });

    const property = await jira.sprint.getSprintProperty({ sprintId, propertyKey: 'suite' });

    expect(property.value).toEqual({ written: true });

    const keys = await jira.sprint.getSprintPropertyKeys({ sprintId });

    expect(keys.keys?.some(entry => entry.key === 'suite')).toBe(true);

    await jira.sprint.deleteSprintProperty({ sprintId, propertyKey: 'suite' });
  });

  it('moves an issue into an epic and back out', async () => {
    await jira.epic.moveIssuesToEpic({ epicIdOrKey: fixtures.epicKey, issues: [issueKey] });

    const inEpic = await jira.epic.getIssuesForEpic({ epicIdOrKey: fixtures.epicKey });

    expect(inEpic.issues?.some(issue => issue.key === issueKey)).toBe(true);

    await jira.epic.removeIssuesFromEpic({ issues: [issueKey] });

    const withoutEpic = await jira.epic.getIssuesWithoutEpic();

    expect(withoutEpic.issues).toBeDefined();
  });

  it('renames the epic and ranks it', async () => {
    await jira.epic.partiallyUpdateEpic({ epicIdOrKey: fixtures.epicKey, summary: testName('renamed epic') });
    await touch(() => jira.epic.rankEpics({ epicIdOrKey: fixtures.epicKey, rankAfterEpic: fixtures.epicKey }));
  });

  it('ranks and estimates an issue', async () => {
    await touch(() => jira.issues.rankIssues({ issues: [issueKey], rankBeforeIssue: fixtures.issueKey }));
    await touch(() => jira.issues.estimateIssueForBoard({ issueIdOrKey: issueKey, boardId: fixtures.boardId, value: '5' }));
    await touch(() => jira.issues.getIssueEstimationForBoard({ issueIdOrKey: issueKey, boardId: fixtures.boardId }));

    const agileIssue = await jira.issues.getAgileIssue({ issueIdOrKey: issueKey });

    expect(agileIssue.key).toBe(issueKey);
  });
});
