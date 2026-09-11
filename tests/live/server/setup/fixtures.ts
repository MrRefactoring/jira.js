import type { ServerClient } from '#/server/createServerClient';
import { testName } from '../../helpers/naming';

export const FIXTURE = {
  propertyKey: 'jira-js',
  schemeAttributeKey: 'jira.js.probe',
  remoteIssueLinkGlobalId: 'jira-js-remote-issue-link',
  remoteVersionLinkGlobalId: 'jira-js-remote-version-link',
} as const;

const PROPERTY_VALUE = { createdBy: 'the jira.js Data Center suite' };

async function waitForBoard(jira: ServerClient): Promise<number> {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const boards = await jira.board.getAllBoards();
    const board = boards.values[0];

    if (board?.id !== undefined) return board.id;

    await new Promise(resolve => setTimeout(resolve, 2_000));
  }

  throw new Error('The Scrum template never produced a board. The agile suites have nothing to run against.');
}

export interface Fixtures {
  projectId: string;
  attachmentId: string;
  workflowSchemeId: number;
  boardId: number;
  epicKey: string;
  issueKey: string;
  commentId: string;
  versionId: string;
  filterId: string;
  customFieldId: string;
  issueTypeId: string;
}

export async function createFixtures(jira: ServerClient, projectKey: string, username: string): Promise<Fixtures> {
  const project = await jira.projects.getProject({ projectIdOrKey: projectKey });
  const boardId = await waitForBoard(jira);

  const fields = await jira.issueFields.getFields();
  const epicName = fields.find(field => field.name === 'Epic Name')?.id;

  if (!epicName) throw new Error('No "Epic Name" field: the project was not created from the Scrum template.');

  const epic = await jira.issues.createIssue({
    fields: {
      project: { key: projectKey },
      summary: 'fixture epic',
      issuetype: { name: 'Epic' },
      [epicName]: 'fixture epic',
    },
  });

  const issue = await jira.issues.createIssue({
    fields: {
      project: { key: projectKey },
      summary: 'fixture issue',
      issuetype: { name: 'Task' },
      description: 'h2. Fixture\n\nCreated by the Data Center suite.',
    },
  });

  const linked = await jira.issues.createIssue({
    fields: { project: { key: projectKey }, summary: 'fixture linked issue', issuetype: { name: 'Task' } },
  });

  await jira.issueLinks.linkIssues({
    type: { name: 'Relates' },
    inwardIssue: { key: issue.key! },
    outwardIssue: { key: linked.key! },
  });

  const comment = await jira.issues.addComment({ issueIdOrKey: issue.key!, body: 'fixture comment' });

  const attached = await jira.issues.addAttachment({
    issueIdOrKey: issue.key!,
    attachments: { filename: 'fixture.txt', content: 'attached by the Data Center suite' },
  });

  await jira.issues.addWorklog({ issueIdOrKey: issue.key!, timeSpent: '1h', comment: 'fixture worklog' });

  await jira.issues.createOrUpdateRemoteIssueLink({
    issueIdOrKey: issue.key!,
    globalId: FIXTURE.remoteIssueLinkGlobalId,
    object: { url: 'https://github.com/MrRefactoring/jira.js', title: 'jira.js' },
  });

  const version = await jira.projectVersions.createVersion({
    name: testName('version'),
    project: projectKey,
    description: 'created by the Data Center suite',
  });

  await jira.projectComponents.createComponent({
    name: testName('component'),
    project: projectKey,
    description: 'created by the Data Center suite',
  });

  await jira.projectVersions.createOrUpdateRemoteVersionLinkByGlobalId({
    versionId: String(version.id),
    globalId: FIXTURE.remoteVersionLinkGlobalId,
    link: 'https://github.com/MrRefactoring/jira.js',
  });

  const sprint = await jira.sprint.createSprint({ name: testName('sprint'), originBoardId: boardId });

  const filter = await jira.filters.createFilter({
    name: testName('filter'),
    jql: `project = ${projectKey}`,
    description: 'created by the Data Center suite',
  });

  await jira.filters.addSharePermission({ id: String(filter.id), type: 'authenticated' });

  const issueTypes = await jira.issueTypes.getIssueAllTypes();
  const issueTypeId = String(issueTypes[0]!.id);

  const customField = await jira.issueFields.createCustomField({
    name: testName('field'),
    description: 'created by the Data Center suite',
    type: 'com.atlassian.jira.plugin.system.customfieldtypes:textfield',
    searcherKey: 'com.atlassian.jira.plugin.system.customfieldtypes:textsearcher',
  });

  await jira.groups.createGroup({ name: testName('group') });

  const workflowScheme = await jira.workflowSchemes.createScheme({
    name: testName('workflow scheme'),
    description: 'created by the Data Center suite',
  });

  const { propertyKey } = FIXTURE;

  await jira.issues.setIssueProperty({ issueIdOrKey: issue.key!, propertyKey, body: PROPERTY_VALUE });
  await jira.projects.setProjectProperty({ projectIdOrKey: projectKey, propertyKey, body: PROPERTY_VALUE });
  await jira.users.setUserProperty({ propertyKey, username, body: PROPERTY_VALUE });
  await jira.issueComments.setCommentProperty({ commentId: String(comment.id), propertyKey, body: PROPERTY_VALUE });
  await jira.issueTypes.setIssueTypeProperty({ issueTypeId, propertyKey, body: PROPERTY_VALUE });
  await jira.board.setBoardProperty({ boardId, propertyKey, body: PROPERTY_VALUE });
  await jira.sprint.setSprintProperty({ sprintId: sprint.id!, propertyKey, body: PROPERTY_VALUE });

  await jira.webhooks.createWebhook({
    name: testName('webhook'),
    url: 'https://example.com/jira-js',
    events: ['jira:issue_created'],
  });

  const permissionSchemes = await jira.permissionSchemes.getPermissionSchemes();
  const permissionSchemeId = permissionSchemes.permissionSchemes?.[0]?.id;

  if (permissionSchemeId === undefined) throw new Error('The instance has no permission scheme to hang the probe on.');

  await jira.permissionSchemes.setSchemeAttribute({
    permissionSchemeId,
    key: FIXTURE.schemeAttributeKey,
    body: 'true',
  });

  const attachmentId = attached[0]?.id;

  if (!attachmentId) throw new Error('The attachment upload answered without an id.');

  return {
    projectId: String(project.id),
    attachmentId: String(attachmentId),
    workflowSchemeId: workflowScheme.id!,
    boardId,
    epicKey: epic.key!,
    issueKey: issue.key!,
    commentId: String(comment.id),
    versionId: String(version.id),
    filterId: String(filter.id),
    customFieldId: String(customField.id),
    issueTypeId,
  };
}
