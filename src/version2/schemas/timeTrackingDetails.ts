import { z } from 'zod';

/** Time tracking details. */
export const TimeTrackingDetailsSchema = z.object({
  /** The original estimate of time needed for this issue in readable format. */
  originalEstimate: z.string().optional(),
  /** The original estimate of time needed for this issue in seconds. */
  originalEstimateSeconds: z.number().int().optional(),
  /** The remaining estimate of time needed for this issue in readable format. */
  remainingEstimate: z.string().optional(),
  /** The remaining estimate of time needed for this issue in seconds. */
  remainingEstimateSeconds: z.number().int().optional(),
  /** Time worked on this issue in readable format. */
  timeSpent: z.string().optional(),
  /** Time worked on this issue in seconds. */
  timeSpentSeconds: z.number().int().optional(),
});

export type TimeTrackingDetails = z.infer<typeof TimeTrackingDetailsSchema>;
