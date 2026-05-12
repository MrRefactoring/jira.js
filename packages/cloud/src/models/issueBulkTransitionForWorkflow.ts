import { z } from 'zod';
import { SimplifiedIssueTransitionSchema } from '#/models/simplifiedIssueTransition';

export const IssueBulkTransitionForWorkflowSchema = z.object({
  /** Indicates whether all the transitions of this workflow are available in the transitions list or not. */
  isTransitionsFiltered: z.boolean().optional(),
  /** List of issue keys from the request which are associated with this workflow. */
  issues: z.array(z.string()).optional(),
  /**
   * List of transitions available for issues from the request which are associated with this workflow.
   *
   * **This list includes only those transitions that are common across the issues in this workflow and do not involve
   * any additional field updates.**
   */
  transitions: z.array(SimplifiedIssueTransitionSchema).optional(),
});

export type IssueBulkTransitionForWorkflow = z.infer<typeof IssueBulkTransitionForWorkflowSchema>;
