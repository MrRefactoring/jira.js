import { z } from 'zod';
import { apiObject } from '#/core';

export const JobSchema = apiObject({
  cronExpression: z.string().optional(),
  firstRunTime: z.number().optional(),
  intervalInMillis: z.number().optional(),
  jobId: z.string().optional(),
  jobRunnerKey: z.string().optional(),
  nextRunTime: z.number().optional(),
  runMode: z.string().optional(),
  runnable: z.boolean().optional(),
  scheduleType: z.string().optional(),
  timeZoneId: z.string().optional(),
});

export type Job = z.infer<typeof JobSchema>;
