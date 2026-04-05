import { z } from 'zod';

/** The project and issue type mapping with a matching custom field context. */
export const ContextForProjectAndIssueTypeSchema = z.object({
  /** The ID of the custom field context. */
  contextId: z.string(),
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /** The ID of the project. */
  projectId: z.string(),
});

export type ContextForProjectAndIssueType = z.infer<typeof ContextForProjectAndIssueTypeSchema>;
