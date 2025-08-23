import { z } from 'zod';

export const GetSchedulingResponseSchema = z.object({
  /** The dependencies for the plan. This is "Sequential" or "Concurrent". */
  dependencies: z.enum(['Sequential', 'Concurrent']),
  /** The end date field for the plan. */
  endDate: z.unknown(),
  /** The estimation unit for the plan. This is "StoryPoints", "Days" or "Hours". */
  estimation: z.enum(['StoryPoints', 'Days', 'Hours']),
  /** The inferred dates for the plan. This is "None", "SprintDates" or "ReleaseDates". */
  inferredDates: z.enum(['None', 'SprintDates', 'ReleaseDates']),
  /** The start date field for the plan. */
  startDate: z.unknown(),
});

export type GetSchedulingResponse = z.infer<typeof GetSchedulingResponseSchema>;
