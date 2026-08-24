import { z } from 'zod';
import { apiObject } from '#/core';
/** How a webhook has been delivering, over the window the instance keeps. */

export const WebhookStatisticsSchema = apiObject({
  counts: apiObject({
    errors: z.number().optional(),
    failures: z.number().optional(),
    successes: z.number().optional(),
    window: apiObject({
      /** Epoch milliseconds the window opened at. */
      start: z.number().optional(),
      /** How long the window is, in milliseconds. */
      duration: z.number().optional(),
    }).optional(),
  }).optional(),
  /** The most recent delivery failure, absent while there has been none. */
  lastError: z.record(z.string(), z.any()).optional(),
});

export type WebhookStatistics = z.infer<typeof WebhookStatisticsSchema>;
