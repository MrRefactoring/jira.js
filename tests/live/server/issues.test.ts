/**
 * The write path through the issues module, end to end against a real Data Center instance.
 *
 * The crawl covers breadth on the readable half; this covers what a read can never prove — that a body serialises the
 * way Jira expects, that a transition moves an issue, that wiki markup goes out as a plain string where Cloud would
 * need a document, and that what comes back matches the schema the library declares for it.
 *
 * The suite owns everything it touches. It creates its own issues rather than reusing the fixture ones, because it
 * deletes, archives and transitions them, and the fixtures are what the crawl reads.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ServerClient } from '#/server/createServerClient';
import { connect } from './setup/client';
import { serverTestEnv } from './setup/env';
import { touch } from './setup/touch';
import { testName } from '../helpers/naming';

describe('issues', () => {
  const { projectKey, username } = serverTestEnv();
  const jira: ServerClient = connect();
  const created: string[] = [];

  const newIssue = async (summary: string, fields: Record<string, unknown> = {}): Promise<string> => {
    const issue = await jira.issues.createIssue({
      fields: { project: { key: projectKey }, summary: testName(summary), issuetype: { name: 'Task' }, ...fields },
    });

    created.push(issue.key!);

    return issue.key!;
  };

  let issueKey: string;

  beforeAll(async () => {
    issueKey = await newIssue('the issues suite', {
      // Data Center takes wiki markup as a plain string. The Cloud surface would reject this and want a document.
      description: 'h2. Heading\n\n*bold* and _italic_',
    });
  });

  afterAll(async () => {
    for (const key of created) await touch(() => jira.issues.deleteIssue({ issueIdOrKey: key, deleteSubtasks: 'true' }));
  });

  it('reads back the issue it created, description and all', async () => {
    const issue = await jira.issues.getIssue({ issueIdOrKey: issueKey });

    expect(issue.key).toBe(issueKey);
    expect(String((issue.fields as Record<string, unknown>).description)).toContain('*bold*');
  });

  it('creates issues in bulk', async () => {
    const bulk = await jira.issues.createIssues({
      issueUpdates: [
        { fields: { project: { key: projectKey }, summary: testName('bulk one'), issuetype: { name: 'Task' } } },
        { fields: { project: { key: projectKey }, summary: testName('bulk two'), issuetype: { name: 'Task' } } },
      ],
    });

    expect(bulk.issues?.length).toBe(2);

    for (const issue of bulk.issues ?? []) created.push(issue.key!);
  });

  it('updates a field and assigns the issue', async () => {
    const summary = testName('renamed');

    await jira.issues.editIssue({ issueIdOrKey: issueKey, fields: { summary } });
    await jira.issues.assign({ issueIdOrKey: issueKey, name: username });

    const issue = await jira.issues.getIssue({ issueIdOrKey: issueKey });

    expect((issue.fields as Record<string, unknown>).summary).toBe(summary);
  });

  it('reads the metadata for creating and editing', async () => {
    const types = await jira.issues.getCreateIssueMetaProjectIssueTypes({ projectIdOrKey: projectKey });

    expect(types).toBeDefined();

    const meta = await jira.issues.getEditIssueMeta({ issueIdOrKey: issueKey });

    expect(meta.fields).toBeDefined();
  });

  it('moves the issue through a transition', async () => {
    const transitions = await jira.issues.getTransitions({ issueIdOrKey: issueKey });
    const transition = transitions.transitions?.[0];

    expect(transition?.id).toBeDefined();

    await jira.issues.doTransition({ issueIdOrKey: issueKey, transition: { id: transition!.id } });
  });

  it('adds, updates, pins and deletes a comment', async () => {
    const body = testName('a comment');
    const comment = await jira.issues.addComment({ issueIdOrKey: issueKey, body });

    expect(comment.body).toBe(body);

    const updated = await jira.issues.updateComment({
      issueIdOrKey: issueKey,
      id: comment.id!,
      body: { body: `${body} — edited` },
    });

    expect(updated.body).toContain('edited');

    const read = await jira.issues.getComment({ issueIdOrKey: issueKey, id: comment.id! });

    expect(read.id).toBe(comment.id);

    await jira.issues.setPinComment({ issueIdOrKey: issueKey, id: comment.id!, body: true });

    const pinned = await jira.issues.getPinnedComments({ issueIdOrKey: issueKey });

    expect(pinned.some(entry => entry.comment?.id === comment.id)).toBe(true);

    await jira.issueComments.setCommentProperty({ commentId: comment.id!, propertyKey: 'suite', body: { written: true } });

    const stored = await jira.issueComments.getCommentProperty({ commentId: comment.id!, propertyKey: 'suite' });

    expect(stored.value).toEqual({ written: true });

    await jira.issueComments.deleteCommentProperty({ commentId: comment.id!, propertyKey: 'suite' });
    await jira.issues.deleteComment({ issueIdOrKey: issueKey, id: comment.id! });
  });

  it('logs work and edits it', async () => {
    const worklog = await jira.issues.addWorklog({
      issueIdOrKey: issueKey,
      timeSpent: '2h',
      comment: testName('worklog'),
    });

    expect(worklog.id).toBeDefined();

    await jira.issues.updateWorklog({ issueIdOrKey: issueKey, id: worklog.id!, body: { timeSpent: '3h' } });

    const read = await jira.issues.getWorklog({ issueIdOrKey: issueKey, id: worklog.id! });

    expect(read.timeSpent).toBe('3h');

    const all = await jira.issues.getIssueWorklog({ issueIdOrKey: issueKey });

    expect(all.worklogs?.length).toBeGreaterThan(0);

    await jira.issueWorklogs.getWorklogsForIds({ ids: [Number(worklog.id)] });

    await jira.issues.deleteWorklog({ issueIdOrKey: issueKey, id: worklog.id! });
  });

  it('votes and watches', async () => {
    // The reporter cannot vote for their own issue, which is what makes this a `touch`: the request shape is what is
    // under test, and Jira refusing on those grounds is a correct answer.
    await touch(() => jira.issues.addVote({ issueIdOrKey: issueKey }));

    const votes = await jira.issues.getVotes({ issueIdOrKey: issueKey });

    expect(votes.self).toBeDefined();

    await touch(() => jira.issues.removeVote({ issueIdOrKey: issueKey }));

    await jira.issues.addWatcher({ issueIdOrKey: issueKey, body: username });

    const watchers = await jira.issues.getIssueWatchers({ issueIdOrKey: issueKey });

    expect(watchers.watchCount).toBeGreaterThan(0);

    await jira.issues.removeWatcher({ issueIdOrKey: issueKey, username });
  });

  it('stores and removes a property', async () => {
    await jira.issues.setIssueProperty({ issueIdOrKey: issueKey, propertyKey: 'suite', body: { written: true } });

    const property = await jira.issues.getIssueProperty({ issueIdOrKey: issueKey, propertyKey: 'suite' });

    expect(property.value).toEqual({ written: true });

    const keys = await jira.issues.getIssuePropertyKeys({ issueIdOrKey: issueKey });

    expect(keys.keys?.some(entry => entry.key === 'suite')).toBe(true);

    await jira.issues.deleteIssueProperty({ issueIdOrKey: issueKey, propertyKey: 'suite' });
  });

  it('keeps remote links, by id and by global id', async () => {
    const link = await jira.issues.createOrUpdateRemoteIssueLink({
      issueIdOrKey: issueKey,
      globalId: 'suite-remote-link',
      object: { url: 'https://example.com/one', title: 'one' },
    });

    expect(link.id).toBeDefined();

    await jira.issues.updateRemoteIssueLink({
      issueIdOrKey: issueKey,
      linkId: String(link.id),
      object: { url: 'https://example.com/two', title: 'two' },
    });

    const read = await jira.issues.getRemoteIssueLinkById({ issueIdOrKey: issueKey, linkId: String(link.id) });

    expect(read.object).toBeDefined();

    const all = await jira.issues.getRemoteIssueLinks({ issueIdOrKey: issueKey });

    expect(all.length).toBeGreaterThan(0);

    await jira.issues.deleteRemoteIssueLinkById({ issueIdOrKey: issueKey, linkId: String(link.id) });

    await jira.issues.createOrUpdateRemoteIssueLink({
      issueIdOrKey: issueKey,
      globalId: 'suite-remote-link',
      object: { url: 'https://example.com/three', title: 'three' },
    });

    await jira.issues.deleteRemoteIssueLinkByGlobalId({ issueIdOrKey: issueKey, globalId: 'suite-remote-link' });

    await touch(() =>
      jira.issues.createReciprocalRemoteIssueLink({
        source: { globalId: 'suite-reciprocal', object: { url: 'https://example.com/four', title: 'four' } },
      }));
  });

  it('links two issues and unlinks them', async () => {
    const other = await newIssue('the other end of a link');

    await jira.issueLinks.linkIssues({
      type: { name: 'Relates' },
      inwardIssue: { key: issueKey },
      outwardIssue: { key: other },
    });

    const issue = await jira.issues.getIssue({ issueIdOrKey: issueKey, fields: 'issuelinks' });
    const links = (issue.fields as { issuelinks?: Array<{ id?: string }> }).issuelinks ?? [];

    expect(links.length).toBeGreaterThan(0);

    const read = await jira.issueLinks.getIssueLink({ linkId: links[0]!.id! });

    expect(read.id).toBe(links[0]!.id);

    await jira.issueLinks.deleteIssueLink({ linkId: links[0]!.id! });
  });

  it('reads and moves sub-tasks', async () => {
    const parent = await newIssue('a parent');

    await jira.issues.createIssue({
      fields: {
        project: { key: projectKey },
        summary: testName('a sub-task'),
        issuetype: { name: 'Sub-task' },
        parent: { key: parent },
      },
    });

    const subTasks = await jira.issues.getSubTasks({ issueIdOrKey: parent });

    expect(subTasks.length).toBe(1);

    await jira.issues.canMoveSubTask({ issueIdOrKey: subTasks[0]!.id! });
    await touch(() => jira.issues.moveSubTasks({ issueIdOrKey: parent, current: 0, original: 0 }));
  });

  it('attaches a file and removes it', async () => {
    const attached = await jira.issues.addAttachment({
      issueIdOrKey: issueKey,
      attachments: { filename: 'suite.txt', content: 'written by the issues suite' },
    });

    const attachment = attached[0]!;

    expect(attachment.id).toBeDefined();

    const meta = await jira.issueAttachments.getAttachment({ id: attachment.id! });

    expect(meta.filename).toBe('suite.txt');

    await jira.issueAttachments.removeAttachment({ id: attachment.id! });
  });

  it('archives and restores', async () => {
    const doomed = await newIssue('to be archived');

    // Archiving needs Jira Software Data Center licensing that a timebomb does not always carry, so what is under
    // test here is the request, not the outcome.
    await touch(() => jira.issues.archiveIssue({ issueIdOrKey: doomed }));
    await touch(() => jira.issues.restoreIssue({ issueIdOrKey: doomed }));
    await touch(() => jira.issues.archiveIssues({ body: doomed }));
  });

  it('notifies about an issue', async () => {
    await touch(() =>
      jira.issues.notify({
        issueIdOrKey: issueKey,
        subject: testName('a notification'),
        textBody: 'sent by the Data Center suite',
        to: { reporter: true },
      }));
  });

  it('searches with a request body', async () => {
    const results = await jira.issueSearch.searchUsingSearchRequest({
      jql: `project = ${projectKey}`,
      maxResults: 5,
      fields: ['summary'],
    });

    expect(results.issues?.length).toBeGreaterThan(0);
  });

  it('finds the issue by JQL and through the picker', async () => {
    const results = await jira.issueSearch.search({ jql: `key = ${issueKey}`, fields: ['summary'] });

    expect(results.issues?.map(issue => issue.key)).toContain(issueKey);

    await jira.issues.getIssuePickerResource({ query: issueKey });
  });
});
