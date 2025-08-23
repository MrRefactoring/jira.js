import { z } from 'zod';
import { ProjectAndIssueTypePairSchema } from './projectAndIssueTypePair';

export const WorkflowReadRequestSchema = z.object({
  /** The list of projects and issue types to query. */
  projectAndIssueTypes: z.array(ProjectAndIssueTypePairSchema).optional(),
  /** The list of workflow IDs to query. */
  workflowIds: z.array(z.string()).optional(),
  /** The list of workflow names to query. */
  workflowNames: z.array(z.string()).optional(),
});

export type WorkflowReadRequest = z.infer<typeof WorkflowReadRequestSchema>;
