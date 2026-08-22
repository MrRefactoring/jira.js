import { describe, expect, expectTypeOf, it } from 'vitest';
import type {
  IssueWebhookPayload,
  SprintWebhookPayload,
  WebhookEvent,
  WebhookHeaders,
  WebhookPayload,
} from '#/webhooks';

/**
 * `jira.js/webhooks` has no runtime side, so what is worth testing is the narrowing a caller relies on and the list of
 * events itself. The last assertion is the one that earns its keep: it fails the day an event joins the union without
 * being written down here, which is how a list like this rots.
 */

const EVENTS = [
  'jira:issue_created',
  'jira:issue_updated',
  'jira:issue_deleted',
  'issue_property_set',
  'issue_property_deleted',
  'worklog_created',
  'worklog_updated',
  'worklog_deleted',
  'comment_created',
  'comment_updated',
  'comment_deleted',
  'attachment_created',
  'attachment_deleted',
  'issuelink_created',
  'issuelink_deleted',
  'issuetype_created',
  'issuetype_updated',
  'issuetype_deleted',
  'project_created',
  'project_updated',
  'project_deleted',
  'project_soft_deleted',
  'project_restored_deleted',
  'project_archived',
  'project_restored_archived',
  'jira:version_created',
  'jira:version_updated',
  'jira:version_deleted',
  'jira:version_released',
  'jira:version_unreleased',
  'jira:version_moved',
  'jira:version_merged',
  'filter_created',
  'filter_updated',
  'filter_deleted',
  'user_created',
  'user_updated',
  'user_deleted',
  'option_voting_changed',
  'option_watching_changed',
  'option_unassigned_issues_changed',
  'option_subtasks_changed',
  'option_issuelinks_changed',
  'option_timetracking_changed',
  'option_timetracking_provider_changed',
  'sprint_created',
  'sprint_updated',
  'sprint_deleted',
  'sprint_started',
  'sprint_closed',
  'board_created',
  'board_updated',
  'board_deleted',
  'board_configuration_changed',
  'app_access_to_objects_blocked',
  'app_access_to_objects_in_container_blocked',
  'jira_expression_evaluation_failed',
] as const satisfies readonly WebhookEvent[];

/** Shaped after the delivery captured in #294, with the reporter's own data replaced. */
const issueCreated = {
  timestamp: 1_704_303_069_063,
  webhookEvent: 'jira:issue_created',
  issue_event_type_name: 'issue_created',
  user: { accountId: '0'.repeat(24), displayName: 'Someone', active: true },
  issue: { id: '10000', key: 'TEST-1', self: 'https://example.atlassian.net/rest/api/2/issue/10000', fields: {} },
  changelog: { id: '10000', items: [{ field: 'summary', fieldtype: 'jira', toString: 'A new issue' }] },
} as unknown as WebhookPayload;

describe('webhook types', () => {
  it('narrows an issue event to the payload Atlassian documents', () => {
    if (issueCreated.webhookEvent !== 'jira:issue_created') throw new Error('the fixture is not an issue creation');

    expectTypeOf(issueCreated).toEqualTypeOf<IssueWebhookPayload>();
    expect(issueCreated.issue.key).toBe('TEST-1');
    expect(issueCreated.changelog?.items?.[0]?.field).toBe('summary');
  });

  it('narrows a sprint event to the sprint payload', () => {
    const payload = { timestamp: 0, webhookEvent: 'sprint_started' } as WebhookPayload;

    if (payload.webhookEvent !== 'sprint_started') throw new Error('the fixture is not a sprint start');

    expectTypeOf(payload).toEqualTypeOf<SprintWebhookPayload>();
    expect(payload.sprint).toBeUndefined();
  });

  it('types every header as the string an HTTP header is', () => {
    expectTypeOf<WebhookHeaders['x-atlassian-webhook-identifier']>().toEqualTypeOf<string>();
    expectTypeOf<WebhookHeaders['x-atlassian-webhook-retry']>().toEqualTypeOf<string | undefined>();
    expectTypeOf<WebhookHeaders['x-atlassian-webhook-flow']>().toEqualTypeOf<'Primary' | 'Secondary'>();
  });

  it('lists every event the union declares', () => {
    expectTypeOf<Exclude<WebhookEvent, (typeof EVENTS)[number]>>().toEqualTypeOf<never>();
    expect(new Set(EVENTS).size).toBe(EVENTS.length);
    expect(EVENTS).toHaveLength(57);
  });
});
