import { z } from 'zod';

/** The project and issue type mapping. */
export const ProjectIssueTypeMappingSchema = z.object({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /** The ID of the project. */
  projectId: z.string(),
});

export type ProjectIssueTypeMapping = z.infer<typeof ProjectIssueTypeMappingSchema>;
