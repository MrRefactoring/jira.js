import { z } from 'zod';

export const GetLatestWebhookInvocationSchema = z.object({
  /** The id of the webhook. */
  webhookId: z.number(),
});

export type GetLatestWebhookInvocation = z.input<typeof GetLatestWebhookInvocationSchema>;
