import { z } from 'zod';
import { WebhookStatisticsSchema } from './webhookStatistics';
/** Keyed by event name. */

export const GetWebhookStatisticsSummarySchema = z.record(z.string(), WebhookStatisticsSchema);

export type GetWebhookStatisticsSummary = z.infer<typeof GetWebhookStatisticsSummarySchema>;
