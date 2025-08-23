import { z } from 'zod';
import { JiraWorkflowStatusSchema } from './jiraWorkflowStatus';
import { JiraWorkflowSchema } from './jiraWorkflow';

export const WorkflowUpdateResponseSchema = z.object({
  /** List of updated statuses. */
  statuses: z.array(JiraWorkflowStatusSchema).optional(),
  /** If there is a [asynchronous task](#async-operations) operation, as a result of this update. */
  taskId: z.string().optional(),
  /** List of updated workflows. */
  workflows: z.array(JiraWorkflowSchema).optional(),
});

export type WorkflowUpdateResponse = z.infer<typeof WorkflowUpdateResponseSchema>;
