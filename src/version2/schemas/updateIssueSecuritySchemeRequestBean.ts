import { z } from 'zod';

export const UpdateIssueSecuritySchemeRequestBeanSchema = z.object({
  /** The description of the security scheme scheme. */
  description: z.string().optional(),
  /** The name of the security scheme scheme. Must be unique. */
  name: z.string().optional(),
});

export type UpdateIssueSecuritySchemeRequestBean = z.infer<typeof UpdateIssueSecuritySchemeRequestBeanSchema>;
