import { z } from 'zod';
import { WorkflowLayoutSchema } from '#/models/workflowLayout';
import { WorkflowScopeSchema } from '#/models/workflowScope';
import { WorkflowReferenceStatusSchema } from '#/models/workflowReferenceStatus';
import { WorkflowTransitionsSchema } from '#/models/workflowTransitions';
import { DocumentVersionSchema } from '#/models/documentVersion';

/** Details of a workflow. */
export const JiraWorkflowSchema = z.object({
  /** The creation date of the workflow. */
  created: z.string().nullable().optional(),
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
  taskId: z.string().nullable().optional(),
  /** The transitions of the workflow. */
  transitions: z.array(WorkflowTransitionsSchema).optional(),
  /** The last edited date of the workflow. */
  updated: z.string().nullable().optional(),
  version: DocumentVersionSchema.optional(),
});

export type JiraWorkflow = z.infer<typeof JiraWorkflowSchema>;
