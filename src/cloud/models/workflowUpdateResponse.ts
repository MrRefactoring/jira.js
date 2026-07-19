import { z } from 'zod';
import { apiObject } from '#/core';
import { JiraWorkflowStatusSchema } from './jiraWorkflowStatus';
import { JiraWorkflowSchema } from './jiraWorkflow';

export const WorkflowUpdateResponseSchema = apiObject({
  /** List of updated statuses. */
  statuses: z.array(JiraWorkflowStatusSchema).optional(),
  /**
   * If there is a [asynchronous
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async-operations) operation, as a result
   * of this update.
   */
  taskId: z.string().nullish(),
  /** List of updated workflows. */
  workflows: z.array(JiraWorkflowSchema).optional(),
});

export type WorkflowUpdateResponse = z.infer<typeof WorkflowUpdateResponseSchema>;
