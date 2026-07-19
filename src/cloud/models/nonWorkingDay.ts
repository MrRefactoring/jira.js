import { z } from 'zod';
import { apiObject } from '#/core';

export const NonWorkingDaySchema = apiObject({
  id: z.number().optional(),
  iso8601Date: z.string().optional(),
});

export type NonWorkingDay = z.infer<typeof NonWorkingDaySchema>;
