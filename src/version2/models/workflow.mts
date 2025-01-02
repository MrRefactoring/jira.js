import type { ProjectDetails } from './projectDetails.mjs';
import { PublishedWorkflowId } from './publishedWorkflowId.mjs';
import { Transition } from './transition.mjs';
import { WorkflowOperations } from './workflowOperations.mjs';
import { WorkflowSchemeIdName } from './workflowSchemeIdName.mjs';
import { WorkflowStatus } from './workflowStatus.mjs';

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
