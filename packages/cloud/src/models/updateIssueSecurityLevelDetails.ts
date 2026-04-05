import { z } from 'zod';

/** Details of issue security scheme level. */
export const UpdateIssueSecurityLevelDetailsSchema = z.object({
  /** The description of the issue security scheme level. */
  description: z.string().max(255, 'description must be at most 255 characters').optional(),
  /** The name of the issue security scheme level. Must be unique. */
  name: z.string().max(60, 'name must be at most 60 characters').optional(),
});

export type UpdateIssueSecurityLevelDetails = z.infer<typeof UpdateIssueSecurityLevelDetailsSchema>;
