/**
 * A list of webhooks. */
export interface WebhookDetails {
  /** The JQL filter that specifies which issues the webhook is sent for. Only a subset of JQL can be used. The supported elements are:

   *  Fields: `issueKey`, `project`, `issuetype`, `status`, `assignee`, `reporter`, `issue.property`, and `cf[id]` (for custom fields—only the epic label custom field is supported).
   *  Operators: `=`, `!=`, `IN`, and `NOT IN`. */
  jqlFilter: string;
  /** The Jira events that trigger the webhook. */
  events: string[];
}
