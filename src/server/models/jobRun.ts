import { z } from 'zod';
import { apiObject } from '#/core';

export const JobRunSchema = apiObject({
  durationInMillis: z.number().optional(),
  message: z.string().optional(),
  runOutcome: z.string().optional(),
  startTime: z.coerce.date().optional(),
});

export type JobRun = z.infer<typeof JobRunSchema>;
