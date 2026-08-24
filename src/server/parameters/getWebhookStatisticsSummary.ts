import { z } from 'zod';

export const GetWebhookStatisticsSummarySchema = z.object({
  /** The id of the webhook. */
  webhookId: z.number(),
});

export type GetWebhookStatisticsSummary = z.input<typeof GetWebhookStatisticsSummarySchema>;
