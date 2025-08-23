import { z } from 'zod';

export const UpdateIssueSecuritySchemeParametersSchema = z.object({
  /** The ID of the issue security scheme. */
  id: z.string(),
  /** The description of the security scheme scheme. */
  description: z.string().optional(),
  /** The name of the security scheme scheme. Must be unique. */
  name: z.string().optional(),
});

export type UpdateIssueSecuritySchemeParameters = z.infer<typeof UpdateIssueSecuritySchemeParametersSchema>;
