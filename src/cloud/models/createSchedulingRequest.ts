import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { CreateDateFieldRequestSchema } from './createDateFieldRequest';

export const CreateSchedulingRequestSchema = apiObject({
  /** The dependencies for the plan. This must be "Sequential" or "Concurrent". */
  dependencies: openEnum(['Sequential', 'Concurrent']).optional(),
  endDate: CreateDateFieldRequestSchema.optional(),
  /** The estimation unit for the plan. This must be "StoryPoints", "Days" or "Hours". */
  estimation: openEnum(['StoryPoints', 'Days', 'Hours']),
  /** The inferred dates for the plan. This must be "None", "SprintDates" or "ReleaseDates". */
  inferredDates: openEnum(['None', 'SprintDates', 'ReleaseDates']).optional(),
  startDate: CreateDateFieldRequestSchema.optional(),
});

export type CreateSchedulingRequest = z.infer<typeof CreateSchedulingRequestSchema>;
