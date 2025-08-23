import { z } from 'zod';
import { ProjectIssueTypeMappingSchema } from './projectIssueTypeMapping';

/** The project and issue type mappings. */
export const ProjectIssueTypeMappingsSchema = z.object({
  /** The project and issue type mappings. */
  mappings: z.array(ProjectIssueTypeMappingSchema),
});

export type ProjectIssueTypeMappings = z.infer<typeof ProjectIssueTypeMappingsSchema>;
