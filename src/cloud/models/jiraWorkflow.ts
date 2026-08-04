import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowLayoutSchema } from './workflowLayout';
import { WorkflowScopeSchema } from './workflowScope';
import { WorkflowReferenceStatusSchema } from './workflowReferenceStatus';
import { WorkflowTransitionsSchema } from './workflowTransitions';
import { DocumentVersionSchema } from './documentVersion';
/** Details of a workflow. */

export const JiraWorkflowSchema = apiObject({
  /** The creation date of the workflow. */
  created: z.string().nullish(),
  /** The description of the workflow. */
  description: z.string().optional(),
  /** The ID of the workflow. */
  id: z.string().optional(),
  /** Indicates if the workflow can be edited. */
  isEditable: z.boolean().optional(),
  loopedTransitionContainerLayout: WorkflowLayoutSchema.optional(),
  /** The name of the workflow. */
  name: z.string().optional(),
  scope: WorkflowScopeSchema.optional(),
  startPointLayout: WorkflowLayoutSchema.optional(),
  /** The statuses referenced in this workflow. */
  statuses: z.array(WorkflowReferenceStatusSchema).optional(),
  /**
   * If there is a current [asynchronous
   * task](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#async-operations) operation for this
   * workflow.
   */
  taskId: z.string().nullish(),
  /** The transitions of the workflow. */
  transitions: z.array(WorkflowTransitionsSchema).optional(),
  /** The last edited date of the workflow. */
  updated: z.string().nullish(),
  version: DocumentVersionSchema.optional(),
});

export type JiraWorkflow = z.infer<typeof JiraWorkflowSchema>;
