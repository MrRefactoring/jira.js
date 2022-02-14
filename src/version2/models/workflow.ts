import { ProjectDetails } from './projectDetails';
import { PublishedWorkflowId } from './publishedWorkflowId';
import { Transition } from './transition';
import { WorkflowOperations } from './workflowOperations';
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
  /** The projects the workflow is assigned to, through workflow schemes. */
  projects?: ProjectDetails[];
  /** Whether the workflow has a draft version. */
  hasDraftWorkflow?: boolean;
  operations?: WorkflowOperations;
  /** The creation date of the workflow. */
  created?: string;
  /** The last edited date of the workflow. */
  updated?: string;
}
