import { z } from 'zod';

export const DeleteWebhookSchema = z.object({
  /** The id of the webhook. */
  webhookId: z.number(),
});

export type DeleteWebhook = z.input<typeof DeleteWebhookSchema>;
