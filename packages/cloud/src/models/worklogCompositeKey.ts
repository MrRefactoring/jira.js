import { z } from 'zod';

export const WorklogCompositeKeySchema = z.object({
  /** The issue ID. */
  issueId: z.number().optional(),
  /** The worklog ID. */
  worklogId: z.number().optional(),
});

export type WorklogCompositeKey = z.infer<typeof WorklogCompositeKeySchema>;
