import type { z } from 'zod';
import { apiObject, openEnum, requireResponseKeys } from '#/core';
import { GetDateFieldResponseSchema } from './getDateFieldResponse';

export const GetSchedulingResponseSchema = requireResponseKeys(
  apiObject({
    /** The dependencies for the plan. This is "Sequential" or "Concurrent". */
    dependencies: openEnum(['Sequential', 'Concurrent']),
    endDate: GetDateFieldResponseSchema.optional(),
    /** The estimation unit for the plan. This is "StoryPoints", "Days" or "Hours". */
    estimation: openEnum(['StoryPoints', 'Days', 'Hours']),
    /** The inferred dates for the plan. This is "None", "SprintDates" or "ReleaseDates". */
    inferredDates: openEnum(['None', 'SprintDates', 'ReleaseDates']),
    startDate: GetDateFieldResponseSchema.optional(),
  }),
  ['endDate', 'startDate'],
);

export type GetSchedulingResponse = z.infer<typeof GetSchedulingResponseSchema>;
