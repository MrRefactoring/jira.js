import { z } from 'zod';

export const GetIssueSecurityLevelParametersSchema = z.object({
  /** The ID of the issue security level. */
  id: z.string(),
});

export type GetIssueSecurityLevelParameters = z.infer<typeof GetIssueSecurityLevelParametersSchema>;
