import { z } from 'zod';
import { WorkflowPreviewLayoutSchema } from '#/models/workflowPreviewLayout';
import { ProjectIssueTypeQueryContextSchema } from '#/models/projectIssueTypeQueryContext';
import { WorkflowPreviewScopeSchema } from '#/models/workflowPreviewScope';
import { WorkflowPreviewStatusSchema } from '#/models/workflowPreviewStatus';
import { TransitionPreviewSchema } from '#/models/transitionPreview';
import { WorkflowDocumentVersionSchema } from '#/models/workflowDocumentVersion';

/** Details of a workflow. */
export const WorkflowPreviewSchema = z.object({
  /** The description of the workflow. */
  description: z.string().optional(),
  /** The ID of the workflow. */
  id: z.string().optional(),
  loopedTransitionContainerLayout: WorkflowPreviewLayoutSchema.optional(),
  /** The name of the workflow. */
  name: z.string().optional(),
  /** The project and issue type context for this workflow query. */
  queryContext: z.array(ProjectIssueTypeQueryContextSchema).optional(),
  scope: WorkflowPreviewScopeSchema.optional(),
  startPointLayout: WorkflowPreviewLayoutSchema.optional(),
  /** The statuses referenced in this workflow. */
  statuses: z.array(WorkflowPreviewStatusSchema).optional(),
  /** The transitions of the workflow. */
  transitions: z.array(TransitionPreviewSchema).optional(),
  version: WorkflowDocumentVersionSchema.optional(),
});

export type WorkflowPreview = z.infer<typeof WorkflowPreviewSchema>;
