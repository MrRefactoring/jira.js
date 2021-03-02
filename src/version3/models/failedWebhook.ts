/**
 * Details about a failed webhook. */
export interface FailedWebhook {
  /** The webhook ID, as sent in the `X-Atlassian-Webhook-Identifier` header with the webhook. */
  id: string;
  /** The webhook body. */
  body?: string;
  /** The original webhook destination. */
  url: string;
  /** The time the webhook was added to the list of failed webhooks (that is, the time of the last failed retry). */
  failureTime: number;
}
