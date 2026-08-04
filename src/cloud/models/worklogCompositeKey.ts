import { z } from 'zod';
import { apiObject } from '#/core';

export const WorklogCompositeKeySchema = apiObject({
  /** The issue ID. */
  issueId: z.number().optional(),
  /** The worklog ID. */
  worklogId: z.number().optional(),
});

export type WorklogCompositeKey = z.infer<typeof WorklogCompositeKeySchema>;
