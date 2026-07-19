import { z } from 'zod';
import { apiObject } from '#/core';
import { GetDateFieldResponseSchema } from './getDateFieldResponse';

export const GetSchedulingResponseSchema = apiObject({
  /** The dependencies for the plan. This is "Sequential" or "Concurrent". */
  dependencies: z.enum(['Sequential', 'Concurrent']),
  endDate: GetDateFieldResponseSchema.optional(),
  /** The estimation unit for the plan. This is "StoryPoints", "Days" or "Hours". */
  estimation: z.enum(['StoryPoints', 'Days', 'Hours']),
  /** The inferred dates for the plan. This is "None", "SprintDates" or "ReleaseDates". */
  inferredDates: z.enum(['None', 'SprintDates', 'ReleaseDates']),
  startDate: GetDateFieldResponseSchema.optional(),
});

export type GetSchedulingResponse = z.infer<typeof GetSchedulingResponseSchema>;
