import { z } from 'zod';

/** Details of issue security scheme level. */
export const UpdateIssueSecurityLevelDetailsSchema = z.object({
  /** The description of the issue security scheme level. */
  description: z.string().optional(),
  /** The name of the issue security scheme level. Must be unique. */
  name: z.string().optional(),
});

export type UpdateIssueSecurityLevelDetails = z.infer<typeof UpdateIssueSecurityLevelDetailsSchema>;
