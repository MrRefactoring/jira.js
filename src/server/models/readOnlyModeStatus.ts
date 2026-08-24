import { z } from 'zod';
import { apiObject } from '#/core';

export const ReadOnlyModeStatusSchema = apiObject({
  /** Whether read-only mode is currently enabled. */
  enabled: z.boolean().optional(),
  /** The estimated end time (local date-time, as entered by the admin) shown in the banner. */
  endTime: z.string().optional(),
  /** The banner message shown to users while read-only mode is active. */
  message: z.string().optional(),
  /** The time zone id the estimated end time is expressed in. */
  timeZone: z.string().optional(),
});

export type ReadOnlyModeStatus = z.infer<typeof ReadOnlyModeStatusSchema>;
