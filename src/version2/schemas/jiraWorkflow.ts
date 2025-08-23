import { z } from 'zod';
import { WorkflowLayoutSchema } from './workflowLayout';
import { WorkflowScopeSchema } from './workflowScope';
import { WorkflowReferenceStatusSchema } from './workflowReferenceStatus';
import { WorkflowTransitionsSchema } from './workflowTransitions';
import { DocumentVersionSchema } from './documentVersion';

/** Details of a workflow. */
export const JiraWorkflowSchema = z.object({
  /** The creation date of the workflow. */
  created: z.string().optional(),
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
  /** If there is a current [asynchronous task](#async-operations) operation for this workflow. */
  taskId: z.string().optional(),
  /**
   * The transitions of the workflow. Note that a transition can have either the deprecated `to`/`from` fields or the
   * `toStatusReference`/`links` fields, but never both nor a combination.
   */
  transitions: z.array(WorkflowTransitionsSchema).optional(),
  /** The last edited date of the workflow. */
  updated: z.string().optional(),
  version: DocumentVersionSchema.optional(),
});

export type JiraWorkflow = z.infer<typeof JiraWorkflowSchema>;
