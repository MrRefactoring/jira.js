import { z } from 'zod';

/** Details about a failed webhook. */
export const FailedWebhookSchema = z.object({
  /** The webhook body. */
  body: z.string().optional(),
  /** The time the webhook was added to the list of failed webhooks (that is, the time of the last failed retry). */
  failureTime: z.number().int(),
  /** The webhook ID, as sent in the `X-Atlassian-Webhook-Identifier` header with the webhook. */
  id: z.string(),
  /** The original webhook destination. */
  url: z.string(),
});

export type FailedWebhook = z.infer<typeof FailedWebhookSchema>;
