import { z } from 'zod';
import { apiObject } from '#/core';

export const WorklogKeyResultSchema = apiObject({
  /** The issue ID. */
  issueId: z.number().optional(),
  /** The worklog ID. */
  worklogId: z.number().optional(),
});

export type WorklogKeyResult = z.infer<typeof WorklogKeyResultSchema>;
