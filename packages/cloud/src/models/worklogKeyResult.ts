import { z } from 'zod';

export const WorklogKeyResultSchema = z.object({
  /** The issue ID. */
  issueId: z.number().optional(),
  /** The worklog ID. */
  worklogId: z.number().optional(),
});

export type WorklogKeyResult = z.infer<typeof WorklogKeyResultSchema>;
