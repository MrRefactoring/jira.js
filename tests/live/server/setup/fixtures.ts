/**
 * Everything the Data Center suites need to exist before they run.
 *
 * The container is thrown away after each run, so this creates rather than makes sure: a fresh Jira has one project
 * template's worth of content and nothing else, and half the surface is unreachable until something is there to point
 * at. A board with a sprint alone opens twenty read endpoints.
 *
 * Values the suites cannot discover — a property key, the global id of a remote link — are chosen here rather than
 * generated, so the crawl can name them without being told what this run happened to create.
 */
import type { ServerClient } from '#/server/createServerClient';
import { testName } from '../../helpers/naming';

/**
 * The names the crawl has to know without being told what this run created.
 *
 * Everything else a fixture makes is named through `testName`, so a second run against an instance the first one
 * dirtied does not trip over "already exists" — the container is disposable, but a developer iterating on one suite
 * should not have to spend five minutes rebuilding it.
 */
export const FIXTURE = {
  propertyKey: 'jira-js',
  schemeAttributeKey: 'jira.js.probe',
  remoteIssueLinkGlobalId: 'jira-js-remote-issue-link',
  remoteVersionLinkGlobalId: 'jira-js-remote-version-link',
} as const;

const PROPERTY_VALUE = { createdBy: 'the jira.js Data Center suite' };

/**
 * Waits for the board the Scrum project template creates.
 *
 * Project creation answers before the template has finished, and the board is the last thing it makes. Without the
 * wait the whole agile half of the surface is missing for the rest of the run, which reads as an unsupported API
 * rather than as a race.
 */
async function waitForBoard(jira: ServerClient): Promise<number> {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const boards = await jira.board.getAllBoards();
    const board = (boards as { values?: Array<{ id?: number }> }).values?.[0];

    if (board?.id !== undefined) return board.id;

    await new Promise(resolve => setTimeout(resolve, 2_000));
  }

  throw new Error('The Scrum template never produced a board. The agile suites have nothing to run against.');
}

export interface Fixtures {
  projectId: string;
  webhookId: number;
  attachmentId: string;
  workflowSchemeId: number;
  boardId: number;
  epicKey: string;
  issueKey: string;
  linkedIssueKey: string;
  commentId: string;
  sprintId: number;
  versionId: string;
  filterId: string;
  customFieldId: string;
  issueTypeId: string;
}

export async function createFixtures(jira: ServerClient, projectKey: string): Promise<Fixtures> {
  const project = await jira.projects.getProject({ projectIdOrKey: projectKey });
  const boardId = await waitForBoard(jira);

  // The Scrum template creates an "Epic Name" custom field and refuses an epic without it. Its id is assigned at
  // template time and differs between instances, so it is looked up rather than written down.
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

  // Not `global`: a private instance refuses to share with anyone on the web, and every instance this suite runs
  // against is private.
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

  // A workflow scheme of its own, because a fresh Jira has none that is not the default, and eight read endpoints —
  // the drafts among them — take a scheme id.
  const workflowScheme = await jira.workflowSchemes.createScheme({
    name: testName('workflow scheme'),
    description: 'created by the Data Center suite',
  });

  // One key across every entity that has properties, so the crawl needs a single constant rather than one per domain.
  const { propertyKey } = FIXTURE;

  await jira.issues.setIssueProperty({ issueIdOrKey: issue.key!, propertyKey, body: PROPERTY_VALUE });
  await jira.projects.setProjectProperty({ projectIdOrKey: projectKey, propertyKey, body: PROPERTY_VALUE });
  await jira.users.setUserProperty({ propertyKey, username: 'admin', body: PROPERTY_VALUE });
  await jira.issueComments.setCommentProperty({ commentId: String(comment.id), propertyKey, body: PROPERTY_VALUE });
  await jira.issueTypes.setIssueTypeProperty({ issueTypeId, propertyKey, body: PROPERTY_VALUE });
  await jira.board.setBoardProperty({ boardId, propertyKey, body: PROPERTY_VALUE });
  await jira.sprint.setSprintProperty({ sprintId: sprint.id!, propertyKey, body: PROPERTY_VALUE });

  // Webhooks are the one part of the surface Atlassian describes in prose rather than in the document, so a fixture
  // is what proves the endpoints written from a WADL and a measurement actually answer.
  const webhook = await jira.webhooks.createWebhook({
    name: testName('webhook'),
    url: 'https://example.com/jira-js',
    events: ['jira:issue_created'],
  });

  await jira.permissionSchemes.setSchemeAttribute({
    permissionSchemeId: 10000,
    key: FIXTURE.schemeAttributeKey,
    body: 'true',
  });

  const attachmentId = attached[0]?.id;

  if (!attachmentId) throw new Error('The attachment upload answered without an id.');

  return {
    projectId: String(project.id),
    webhookId: webhook.id!,
    attachmentId: String(attachmentId),
    workflowSchemeId: workflowScheme.id!,
    boardId,
    epicKey: epic.key!,
    issueKey: issue.key!,
    linkedIssueKey: linked.key!,
    commentId: String(comment.id),
    sprintId: sprint.id!,
    versionId: String(version.id),
    filterId: String(filter.id),
    customFieldId: String(customField.id),
    issueTypeId,
  };
}
