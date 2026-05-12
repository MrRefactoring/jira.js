import { z } from 'zod';
import { JiraWorkflowStatusSchema } from '#/models/jiraWorkflowStatus';
import { JiraWorkflowSchema } from '#/models/jiraWorkflow';

/** Details of the created workflows and statuses. */
export const WorkflowCreateResponseSchema = z.object({
  /** List of created statuses. */
  statuses: z.array(JiraWorkflowStatusSchema).optional(),
  /** List of created workflows. */
  workflows: z.array(JiraWorkflowSchema).optional(),
});

export type WorkflowCreateResponse = z.infer<typeof WorkflowCreateResponseSchema>;
