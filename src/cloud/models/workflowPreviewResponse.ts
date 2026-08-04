import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraWorkflowPreviewStatusSchema } from './jiraWorkflowPreviewStatus';
import { WorkflowPreviewSchema } from './workflowPreview';
/** The preview workflow response containing workflows and statuses. */

export const WorkflowPreviewResponseSchema = apiObject({
  /** The list of statuses referenced by the workflows. */
  statuses: z.array(JiraWorkflowPreviewStatusSchema).optional(),
  /** The list of workflows. The workflows are returned in the same order as specified in the request. */
  workflows: z.array(WorkflowPreviewSchema).optional(),
});

export type WorkflowPreviewResponse = z.infer<typeof WorkflowPreviewResponseSchema>;
