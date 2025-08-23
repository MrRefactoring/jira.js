import { z } from 'zod';

/** A list of webhooks. */
export const WebhookDetailsSchema = z.object({
  /** The Jira events that trigger the webhook. */
  events: z.array(
    z.enum([
      'jira:issue_created',
      'jira:issue_updated',
      'jira:issue_deleted',
      'comment_created',
      'comment_updated',
      'comment_deleted',
      'issue_property_set',
      'issue_property_deleted',
    ]),
  ),
  /**
   * A list of field IDs. When the issue changelog contains any of the fields, the webhook `jira:issue_updated` is sent.
   * If this parameter is not present, the app is notified about all field updates.
   */
  fieldIdsFilter: z.array(z.string()).optional(),
  /**
   * A list of issue property keys. A change of those issue properties triggers the `issue_property_set` or
   * `issue_property_deleted` webhooks. If this parameter is not present, the app is notified about all issue property
   * updates.
   */
  issuePropertyKeysFilter: z.array(z.string()).optional(),
  /**
   * The JQL filter that specifies which issues the webhook is sent for. Only a subset of JQL can be used. The supported
   * elements are:
   *
   * - Fields: `issueKey`, `project`, `issuetype`, `status`, `assignee`, `reporter`, `issue.property`, and `cf[id]`. For
   *   custom fields (`cf[id]`), only the epic label custom field is supported.".
   * - Operators: `=`, `!=`, `IN`, and `NOT IN`.
   */
  jqlFilter: z.string(),
});

export type WebhookDetails = z.infer<typeof WebhookDetailsSchema>;
