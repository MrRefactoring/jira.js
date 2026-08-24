import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ScheduledImportDetailsSchema = apiObject({
  /** Schedule ID */
  importScheduleId: z.string().optional(),
  /** When the schedule starts */
  startTime: z.coerce.date().optional(),
  /**
   * The frequency of the scheduled import. ONCE: runs only at startTime. DAILY: runs every day at the specified time.
   * WEEKLY: runs every 7 days. MONTHLY: runs on the same day of each month.
   */
  runFrequency: openEnum(['ONCE', 'DAILY', 'WEEKLY', 'MONTHLY']).optional(),
  /** Next scheduled execution time */
  nextScheduledTime: z.coerce.date().optional(),
  /** When the schedule was created */
  createdAt: z.coerce.date().optional(),
});

export type ScheduledImportDetails = z.infer<typeof ScheduledImportDetailsSchema>;
