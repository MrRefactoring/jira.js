import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ImportScheduleRequestSchema = apiObject({
  /**
   * The date and time when the first import should execute, in ISO 8601 format (e.g., '2024-01-15T02:00:00Z'). Must be
   * in the future.
   */
  startTime: z.coerce.date(),
  /**
   * The frequency of the scheduled import. ONCE: runs only at startTime. DAILY: runs every day at the specified time.
   * WEEKLY: runs every 7 days. MONTHLY: runs on the same day of each month.
   */
  runInterval: openEnum(['ONCE', 'DAILY', 'WEEKLY', 'MONTHLY']),
  /**
   * Optional webhook URL to call after each scheduled import execution. The URL will receive a POST request with
   * execution status.
   */
  callbackUrl: z.url().nullish(),
});

export type ImportScheduleRequest = z.infer<typeof ImportScheduleRequestSchema>;
