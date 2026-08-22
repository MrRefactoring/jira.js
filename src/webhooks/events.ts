/**
 * The events Jira sends a webhook for, grouped by the entity each one concerns.
 *
 * The names are the literal values of the `webhookEvent` field in the request body, spelling and prefix included —
 * Atlassian prefixes some with `jira:` and not others, and nothing about the event decides which.
 */

/** An issue was created, edited or deleted. The only group whose payload Atlassian documents in full. */
export type IssueWebhookEvent = 'jira:issue_created' | 'jira:issue_updated' | 'jira:issue_deleted';

/** An entity property was written to or removed from an issue. */
export type IssuePropertyWebhookEvent = 'issue_property_set' | 'issue_property_deleted';

export type WorklogWebhookEvent = 'worklog_created' | 'worklog_updated' | 'worklog_deleted';

export type CommentWebhookEvent = 'comment_created' | 'comment_updated' | 'comment_deleted';

export type AttachmentWebhookEvent = 'attachment_created' | 'attachment_deleted';

/** A link between two issues. There is no update event: a link is made or unmade. */
export type IssueLinkWebhookEvent = 'issuelink_created' | 'issuelink_deleted';

export type IssueTypeWebhookEvent = 'issuetype_created' | 'issuetype_updated' | 'issuetype_deleted';

/**
 * A project changed.
 *
 * Deletion has three of these. `project_soft_deleted` is the trash, reversible by `project_restored_deleted`;
 * `project_deleted` is the end of it.
 */
export type ProjectWebhookEvent =
  | 'project_created'
  | 'project_updated'
  | 'project_deleted'
  | 'project_soft_deleted'
  | 'project_restored_deleted'
  | 'project_archived'
  | 'project_restored_archived';

export type VersionWebhookEvent =
  | 'jira:version_created'
  | 'jira:version_updated'
  | 'jira:version_deleted'
  | 'jira:version_released'
  | 'jira:version_unreleased'
  | 'jira:version_moved'
  | 'jira:version_merged';

export type FilterWebhookEvent = 'filter_created' | 'filter_updated' | 'filter_deleted';

export type UserWebhookEvent = 'user_created' | 'user_updated' | 'user_deleted';

/** A site-wide setting was turned on or off. */
export type OptionWebhookEvent =
  | 'option_voting_changed'
  | 'option_watching_changed'
  | 'option_unassigned_issues_changed'
  | 'option_subtasks_changed'
  | 'option_issuelinks_changed'
  | 'option_timetracking_changed'
  | 'option_timetracking_provider_changed';

export type SprintWebhookEvent =
  | 'sprint_created'
  | 'sprint_updated'
  | 'sprint_deleted'
  | 'sprint_started'
  | 'sprint_closed';

export type BoardWebhookEvent =
  | 'board_created'
  | 'board_updated'
  | 'board_deleted'
  | 'board_configuration_changed';

/** An app was refused access to data it asked for. Delivered to the app, not to a user's webhook. */
export type AppAccessWebhookEvent = 'app_access_to_objects_blocked' | 'app_access_to_objects_in_container_blocked';

/** A Jira expression an app registered could not be evaluated. */
export type JiraExpressionWebhookEvent = 'jira_expression_evaluation_failed';

/** Every event above, as one union. */
export type WebhookEvent =
  | IssueWebhookEvent
  | IssuePropertyWebhookEvent
  | WorklogWebhookEvent
  | CommentWebhookEvent
  | AttachmentWebhookEvent
  | IssueLinkWebhookEvent
  | IssueTypeWebhookEvent
  | ProjectWebhookEvent
  | VersionWebhookEvent
  | FilterWebhookEvent
  | UserWebhookEvent
  | OptionWebhookEvent
  | SprintWebhookEvent
  | BoardWebhookEvent
  | AppAccessWebhookEvent
  | JiraExpressionWebhookEvent;
