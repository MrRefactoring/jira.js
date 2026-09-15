import { z } from 'zod';
import { apiObject } from '#/core';

/** How far the work has come, as time logged against time estimated. */
export const IssueProgressSchema = apiObject({
  /** Seconds logged. */
  progress: z.number().optional(),
  /** Seconds logged plus seconds still estimated. */
  total: z.number().optional(),
  /** Logged as a share of the total, 0 to 100. */
  percent: z.number().optional(),
});

export type IssueProgress = z.infer<typeof IssueProgressSchema>;
