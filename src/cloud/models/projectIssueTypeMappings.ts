import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectIssueTypeMappingSchema } from './projectIssueTypeMapping';
/** The project and issue type mappings. */

export const ProjectIssueTypeMappingsSchema = apiObject({
  /** The project and issue type mappings. */
  mappings: z.array(ProjectIssueTypeMappingSchema),
});

export type ProjectIssueTypeMappings = z.infer<typeof ProjectIssueTypeMappingsSchema>;
