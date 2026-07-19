import { z } from 'zod';
import { apiObject } from '#/core';
/** Details about an project using security scheme mapping. */

export const IssueSecuritySchemeToProjectMappingSchema = apiObject({
  issueSecuritySchemeId: z.string().optional(),
  projectId: z.string().optional(),
});

export type IssueSecuritySchemeToProjectMapping = z.infer<typeof IssueSecuritySchemeToProjectMappingSchema>;
