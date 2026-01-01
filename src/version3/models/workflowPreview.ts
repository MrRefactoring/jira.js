import type { WorkflowPreviewLayout } from './workflowPreviewLayout';
import type { ProjectIssueTypeQueryContext } from './projectIssueTypeQueryContext';
import type { WorkflowPreviewScope } from './workflowPreviewScope';
import type { WorkflowPreviewStatus } from './workflowPreviewStatus';
import type { TransitionPreview } from './transitionPreview';
import type { WorkflowDocumentVersion } from './workflowDocumentVersion';

/** Details of a workflow. */
export interface WorkflowPreview {
  /** The description of the workflow. */
  description?: string;
  /** The ID of the workflow. */
  id?: string;
  loopedTransitionContainerLayout?: WorkflowPreviewLayout;
  /** The name of the workflow. */
  name?: string;
  /** The project and issue type context for this workflow query. */
  queryContext?: ProjectIssueTypeQueryContext[];
  scope?: WorkflowPreviewScope;
  startPointLayout?: WorkflowPreviewLayout;
  /** The statuses referenced in this workflow. */
  statuses?: WorkflowPreviewStatus[];
  /** The transitions of the workflow. */
  transitions?: TransitionPreview[];
  version?: WorkflowDocumentVersion;
}
