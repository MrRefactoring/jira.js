import { z } from 'zod';
import { apiObject } from '#/core';

export const ReadOnlyModeUpdateRequestSchema = apiObject({
  /** Whether read-only mode should be enabled. */
  enabled: z.boolean().optional(),
  /** The estimated end time as a local date-time (no offset). Omit to leave unchanged; send an empty string to clear it. */
  endTime: z.string().optional(),
  /**
   * The banner message shown to users while read-only mode is active. Omit to leave it unchanged; send an empty string
   * to reset it to the default.
   */
  message: z.string().optional(),
  /** The time zone id the estimated end time is expressed in. Omit to leave unchanged; send an empty string to clear it. */
  timeZone: z.string().optional(),
});

export type ReadOnlyModeUpdateRequest = z.infer<typeof ReadOnlyModeUpdateRequestSchema>;
