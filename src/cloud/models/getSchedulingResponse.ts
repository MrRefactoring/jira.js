import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { requiredInResponse } from '#/core/compatibility';
import { GetDateFieldResponseSchema } from './getDateFieldResponse';

export const GetSchedulingResponseSchema = apiObject({
  /** The dependencies for the plan. This is "Sequential" or "Concurrent". */
  dependencies: openEnum(['Sequential', 'Concurrent']),
  endDate: requiredInResponse(GetDateFieldResponseSchema),
  /** The estimation unit for the plan. This is "StoryPoints", "Days" or "Hours". */
  estimation: openEnum(['StoryPoints', 'Days', 'Hours']),
  /** The inferred dates for the plan. This is "None", "SprintDates" or "ReleaseDates". */
  inferredDates: openEnum(['None', 'SprintDates', 'ReleaseDates']),
  startDate: requiredInResponse(GetDateFieldResponseSchema),
});

export type GetSchedulingResponse = z.infer<typeof GetSchedulingResponseSchema>;
