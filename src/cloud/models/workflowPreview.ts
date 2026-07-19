import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkflowPreviewLayoutSchema } from './workflowPreviewLayout';
import { ProjectIssueTypeQueryContextSchema } from './projectIssueTypeQueryContext';
import { WorkflowPreviewScopeSchema } from './workflowPreviewScope';
import { WorkflowPreviewStatusSchema } from './workflowPreviewStatus';
import { TransitionPreviewSchema } from './transitionPreview';
import { WorkflowDocumentVersionSchema } from './workflowDocumentVersion';
/** Details of a workflow. */

export const WorkflowPreviewSchema = apiObject({
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
