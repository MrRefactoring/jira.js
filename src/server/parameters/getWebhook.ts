import { z } from 'zod';

export const GetWebhookSchema = z.object({
  /** The id of the webhook. */
  webhookId: z.number(),
});

export type GetWebhook = z.input<typeof GetWebhookSchema>;
