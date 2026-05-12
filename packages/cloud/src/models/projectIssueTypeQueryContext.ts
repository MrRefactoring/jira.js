import { z } from 'zod';

/** Project and issue type context for workflow queries made using issue types. */
export const ProjectIssueTypeQueryContextSchema = z.object({
  /** The set of issue type IDs. */
  issueTypes: z.array(z.string()).optional(),
  /** The ID of the project. */
  project: z.string().optional(),
});

export type ProjectIssueTypeQueryContext = z.infer<typeof ProjectIssueTypeQueryContextSchema>;
