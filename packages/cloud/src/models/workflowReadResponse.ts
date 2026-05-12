import { z } from 'zod';
import { JiraWorkflowStatusSchema } from '#/models/jiraWorkflowStatus';
import { JiraWorkflowSchema } from '#/models/jiraWorkflow';

/** Details of workflows and related statuses. */
export const WorkflowReadResponseSchema = z.object({
  /** List of statuses. */
  statuses: z.array(JiraWorkflowStatusSchema).optional(),
  /** List of workflows. */
  workflows: z.array(JiraWorkflowSchema).optional(),
});

export type WorkflowReadResponse = z.infer<typeof WorkflowReadResponseSchema>;
