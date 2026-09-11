import { z } from 'zod';

export const GetWebhookStatisticsSchema = z.object({
  /** The id of the webhook. */
  webhookId: z.number(),
});

export type GetWebhookStatistics = z.input<typeof GetWebhookStatisticsSchema>;
