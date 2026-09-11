import { z } from 'zod';

export const GetWebhooksSchema = z.object({
  /** Only webhooks delivering this event. */
  event: z.string().optional(),
  /** Include delivery statistics with each webhook. */
  statistics: z.boolean().optional(),
  start: z.number().optional(),
  limit: z.number().optional(),
});

export type GetWebhooks = z.input<typeof GetWebhooksSchema>;
