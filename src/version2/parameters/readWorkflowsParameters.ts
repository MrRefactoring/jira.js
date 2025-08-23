import { z } from 'zod';
import { ProjectAndIssueTypePairSchema } from './projectAndIssueTypePair';

export const ReadWorkflowsParametersSchema = z.object({
  /**
   * Return the new field `approvalConfiguration` instead of the deprecated status properties for approval
   * configuration.
   */
  useApprovalConfiguration: z.boolean().optional(),
  /** The list of projects and issue types to query. */
  projectAndIssueTypes: z.array(ProjectAndIssueTypePairSchema).optional(),
  /** The list of workflow IDs to query. */
  workflowIds: z.array(z.string()).optional(),
  /** The list of workflow names to query. */
  workflowNames: z.array(z.string()).optional(),
});

export type ReadWorkflowsParameters = z.infer<typeof ReadWorkflowsParametersSchema>;
