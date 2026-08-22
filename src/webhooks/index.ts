/**
 * Types for the webhooks Jira sends you.
 *
 * The rest of this library talks to Jira. This subpath is the other direction: the request Jira makes to a server of
 * yours when something happens on the site. There is no client here and nothing to call — a webhook arrives at
 * whatever framework you already run, and all that was missing was the shape of what arrives.
 *
 * ```ts
 * import type { WebhookHeaders, WebhookPayload } from 'jira.js/webhooks';
 *
 * app.post('/jira', (request, response) => {
 *   const headers = request.headers as WebhookHeaders;
 *   const payload = request.body as WebhookPayload;
 *
 *   switch (payload.webhookEvent) {
 *     case 'jira:issue_created':
 *       console.log(headers['x-atlassian-webhook-identifier'], payload.issue.key);
 *       break;
 *   }
 *
 *   response.sendStatus(200);
 * });
 * ```
 *
 * Types only, and deliberately: this subpath compiles away to nothing. There is no parser and no signature check,
 * because a webhook body is shaped by the site that sent it — custom fields, apps, a Data Center release Atlassian
 * documents separately — and a schema strict enough to be worth having would throw on bodies that are perfectly
 * valid. The cast above is the honest interface: you are telling the compiler what Jira sends, and this subpath is
 * where that claim is written down.
 */
export type {
  WebhookEvent,
  IssueWebhookEvent,
  IssuePropertyWebhookEvent,
  WorklogWebhookEvent,
  CommentWebhookEvent,
  AttachmentWebhookEvent,
  IssueLinkWebhookEvent,
  IssueTypeWebhookEvent,
  ProjectWebhookEvent,
  VersionWebhookEvent,
  FilterWebhookEvent,
  UserWebhookEvent,
  OptionWebhookEvent,
  SprintWebhookEvent,
  BoardWebhookEvent,
  AppAccessWebhookEvent,
  JiraExpressionWebhookEvent,
} from './events';

export type { WebhookHeaders } from './headers';

export type {
  WebhookPayload,
  WebhookPayloadBase,
  IssueWebhookPayload,
  IssuePropertyWebhookPayload,
  WorklogWebhookPayload,
  CommentWebhookPayload,
  AttachmentWebhookPayload,
  IssueLinkWebhookPayload,
  IssueTypeWebhookPayload,
  ProjectWebhookPayload,
  VersionWebhookPayload,
  FilterWebhookPayload,
  UserWebhookPayload,
  OptionWebhookPayload,
  SprintWebhookPayload,
  BoardWebhookPayload,
  AppAccessWebhookPayload,
  JiraExpressionWebhookPayload,
} from './payloads';
