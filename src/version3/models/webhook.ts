/** A webhook. */
export interface Webhook {
  /** The ID of the webhook. */
  id: number;
  /** The JQL filter that specifies which issues the webhook is sent for. */
  jqlFilter: string;
  /**
   * A list of field IDs. When the issue changelog contains any of the fields, the webhook `jira:issue_updated` is sent.
   * If this parameter is not present, the app is notified about all field updates.
   */
  fieldIdsFilter?: string[];
  /**
   * A list of issue property keys. A change of those issue properties triggers the `issue_property_set` or
   * `issue_property_deleted` webhooks. If this parameter is not present, the app is notified about all issue property updates.
   */
  issuePropertyKeysFilter?: string[];
  /** The Jira events that trigger the webhook. */
  events: string[];
  expirationDate?: number;
}
