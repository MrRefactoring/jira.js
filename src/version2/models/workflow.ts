import type { ProjectDetails } from './projectDetails.js';
import type { PublishedWorkflowId } from './publishedWorkflowId.js';
import type { Transition } from './transition.js';
import type { WorkflowOperations } from './workflowOperations.js';
import type { WorkflowSchemeIdName } from './workflowSchemeIdName.js';
import type { WorkflowStatus } from './workflowStatus.js';

/** Details about a workflow. */
export interface Workflow {
  /** The creation date of the workflow. */
  created?: string;
  /** The description of the workflow. */
  description: string;
  /** Whether the workflow has a draft version. */
  hasDraftWorkflow?: boolean;
  id: PublishedWorkflowId;
  /** Whether this is the default workflow. */
  isDefault?: boolean;
  operations?: WorkflowOperations;
  /** The projects the workflow is assigned to, through workflow schemes. */
  projects?: ProjectDetails[];
  /** The workflow schemes the workflow is assigned to. */
  schemes?: WorkflowSchemeIdName[];
  /** The statuses of the workflow. */
  statuses?: WorkflowStatus[];
  /** The transitions of the workflow. */
  transitions?: Transition[];
  /** The last edited date of the workflow. */
  updated?: string;
}
