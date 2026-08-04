import { z } from 'zod';
import { apiObject } from '#/core';
/** The project and issue type mapping. */

export const ProjectIssueTypeMappingSchema = apiObject({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /** The ID of the project. */
  projectId: z.string(),
});

export type ProjectIssueTypeMapping = z.infer<typeof ProjectIssueTypeMappingSchema>;
