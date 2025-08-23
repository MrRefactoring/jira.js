import { z } from 'zod';

export const NonWorkingDaySchema = z.object({
  id: z.number().int().optional(),
  iso8601Date: z.string().optional(),
});

export type NonWorkingDay = z.infer<typeof NonWorkingDaySchema>;
