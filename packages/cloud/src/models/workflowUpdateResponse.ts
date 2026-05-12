import { z } from 'zod';
import { JiraWorkflowStatusSchema } from '#/models/jiraWorkflowStatus';
import { JiraWorkflowSchema } from '#/models/jiraWorkflow';

export const WorkflowUpdateResponseSchema = z.object({
  /** List of updated statuses. */
  statuses: z.array(JiraWorkflowStatusSchema).optional(),
  /**
   * If there is a [asynchronous
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async-operations) operation, as a result of
   * this update.
   */
  taskId: z.string().nullable().optional(),
  /** List of updated workflows. */
  workflows: z.array(JiraWorkflowSchema).optional(),
});

export type WorkflowUpdateResponse = z.infer<typeof WorkflowUpdateResponseSchema>;
