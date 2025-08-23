import { z } from 'zod';
import { JiraWorkflowStatusSchema } from './jiraWorkflowStatus';
import { JiraWorkflowSchema } from './jiraWorkflow';

/** Details of workflows and related statuses. */
export const WorkflowReadResponseSchema = z.object({
  /** List of statuses. */
  statuses: z.array(JiraWorkflowStatusSchema).optional(),
  /** List of workflows. */
  workflows: z.array(JiraWorkflowSchema).optional(),
});

export type WorkflowReadResponse = z.infer<typeof WorkflowReadResponseSchema>;
