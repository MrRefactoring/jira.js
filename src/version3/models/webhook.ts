/**
 * A webhook. */
export interface Webhook {
  /** The ID of the webhook. */
  id: number;
  /** The JQL filter that specifies which issues the webhook is sent for. */
  jqlFilter: string;
  /** The Jira events that trigger the webhook. */
  events: string[];
  expirationDate: number;
}
