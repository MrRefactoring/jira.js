import { z } from 'zod';

/** A project and issueType ID pair that identifies a status mapping. */
export const ProjectAndIssueTypePairSchema = z.object({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /** The ID of the project. */
  projectId: z.string(),
});

export type ProjectAndIssueTypePair = z.infer<typeof ProjectAndIssueTypePairSchema>;
