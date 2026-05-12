import { z } from 'zod';

/** Details about an project using security scheme mapping. */
export const IssueSecuritySchemeToProjectMappingSchema = z.object({
  issueSecuritySchemeId: z.string().optional(),
  projectId: z.string().optional(),
});

export type IssueSecuritySchemeToProjectMapping = z.infer<typeof IssueSecuritySchemeToProjectMappingSchema>;
