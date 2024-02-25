import test from 'ava';
import { Constants } from '../constants';
import { Version3Models } from '../../../src';
import { cleanupEnvironment, getVersion3Client, prepareEnvironment } from '../utils';

let createdIssue: Version3Models.CreatedIssue;
const client = getVersion3Client();

test.before(async () => {
  await prepareEnvironment();
});

test.after(async () => {
  await cleanupEnvironment();
});

test.serial('should create issue', async t => {
  createdIssue = await client.issues.createIssue({
    fields: {
      summary: Constants.testIssueSummary,
      issuetype: {
        name: 'Task',
      },
      project: {
        key: Constants.testProjectKey,
      },
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [
              {
                text: Constants.testIssueDescription,
                type: 'text',
              },
            ],
          },
        ],
      },
    },
  });

  t.truthy(!!createdIssue);
  t.truthy(!!createdIssue.id);
  t.truthy(!!createdIssue.self);
  t.is(createdIssue.key, `${Constants.testProjectKey}-1`);
});

test.serial('should get issue', async t => {
  const issue = await client.issues.getIssue({ issueIdOrKey: createdIssue.id });

  t.truthy(!!issue);

  // Fields section
  t.is(issue.fields.summary, Constants.testIssueSummary);
  t.deepEqual(issue.fields.description, {
    content: [{
      content: [{
        text: Constants.testIssueDescription,
        type: 'text',
      }],
      type: 'paragraph',
    }],
    type: 'doc',
    version: 1,
  });
  t.is(issue.fields.status.name, 'To Do');
  t.truthy(!!issue.fields.priority);
  t.truthy(!!issue.fields.assignee);
  t.truthy(!!issue.fields.timetracking);
  t.truthy(!!issue.fields.issuetype);
  t.truthy(!!issue.fields.watches);
  t.truthy(!!issue.fields.created);
  t.truthy(!!issue.fields.labels);
  t.truthy(!!issue.fields.updated);
  t.truthy(!!issue.fields.components);
  t.truthy(!!issue.fields.attachment);
  t.truthy(!!issue.fields.creator);
  t.truthy(!!issue.fields.subtasks);
  t.truthy(!!issue.fields.reporter);
  t.truthy(!!issue.fields.comment);
  t.truthy(!!issue.fields.votes);
  t.truthy(!!issue.fields.worklog);
});

test.serial('should update issue description', async t => {
  await client.issues.editIssue({
    issueIdOrKey: createdIssue.id,
    fields: {
      description: 'this is a new description',
    },
  });

  const issue = await client.issues.getIssue({ issueIdOrKey: createdIssue.id });

  t.deepEqual(issue.fields.description, {
    content: [{
      content: [{
        text: 'this is a new description',
        type: 'text',
      }],
      type: 'paragraph',
    }],
    type: 'doc',
    version: 1,
  });
});

test.serial('should remove issue', async t => {
  const removedIssue = await client.issues.deleteIssue({ issueIdOrKey: createdIssue.id });

  t.is<string | void, string>(removedIssue, '');
});
