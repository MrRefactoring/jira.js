import { PublishedWorkflowId } from './publishedWorkflowId';
import { Transition } from './transition';
import { WorkflowSchemeIdName } from './workflowSchemeIdName';
import { WorkflowStatus } from './workflowStatus';

/** Details about a workflow. */
export interface Workflow {
  id: PublishedWorkflowId;
  /** The description of the workflow. */
  description: string;
  /** The transitions of the workflow. */
  transitions?: Transition[];
  /** The statuses of the workflow. */
  statuses?: WorkflowStatus[];
  /** Whether this is the default workflow. */
  isDefault?: boolean;
  /** The workflow schemes the workflow is assigned to. */
  schemes?: WorkflowSchemeIdName[];
}
