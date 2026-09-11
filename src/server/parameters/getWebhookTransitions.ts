import { z } from 'zod';

export const GetWebhookTransitionsSchema = z.object({
  /** The id of the webhook. */
  webhookId: z.number(),
});

export type GetWebhookTransitions = z.input<typeof GetWebhookTransitionsSchema>;
