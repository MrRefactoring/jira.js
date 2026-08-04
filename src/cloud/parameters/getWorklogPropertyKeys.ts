import { z } from 'zod';

export const GetWorklogPropertyKeysSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the worklog. */
  worklogId: z.string(),
});

export type GetWorklogPropertyKeys = z.input<typeof GetWorklogPropertyKeysSchema>;
