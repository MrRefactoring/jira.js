import { z } from 'zod';

export const GetWorklogSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** Worklog id */
  id: z.string(),
});

export type GetWorklog = z.input<typeof GetWorklogSchema>;
