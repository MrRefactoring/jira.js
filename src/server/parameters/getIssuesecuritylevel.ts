import { z } from 'zod';

export const GetIssuesecuritylevelSchema = z.object({
  /** An issue security level id */
  id: z.string(),
});

export type GetIssuesecuritylevel = z.input<typeof GetIssuesecuritylevelSchema>;
