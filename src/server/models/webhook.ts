import { z } from 'zod';
import { apiObject } from '#/core';
import { WebhookStatisticsSchema } from './webhookStatistics';

export const WebhookSchema = apiObject({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  events: z.array(z.string()).optional(),
  createdDate: z.number().optional(),
  updatedDate: z.number().optional(),
  configuration: z.record(z.string(), z.any()).optional(),
  active: z.boolean().optional(),
  scopeType: z.string().optional(),
  sslVerificationRequired: z.boolean().optional(),
  statistics: WebhookStatisticsSchema.optional(),
});

export type Webhook = z.infer<typeof WebhookSchema>;
