import { z } from 'zod';

export const CreateSchedulingRequestSchema = z.object({
  /** The dependencies for the plan. This must be "Sequential" or "Concurrent". */
  dependencies: z.enum(['Sequential', 'Concurrent']).optional(),
  /** The end date field for the plan. */
  endDate: z.unknown().optional(),
  /** The estimation unit for the plan. This must be "StoryPoints", "Days" or "Hours". */
  estimation: z.enum(['StoryPoints', 'Days', 'Hours']),
  /** The inferred dates for the plan. This must be "None", "SprintDates" or "ReleaseDates". */
  inferredDates: z.enum(['None', 'SprintDates', 'ReleaseDates']).optional(),
  /** The start date field for the plan. */
  startDate: z.unknown().optional(),
});

export type CreateSchedulingRequest = z.infer<typeof CreateSchedulingRequestSchema>;
