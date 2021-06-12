import { WorkflowScheme } from './workflowScheme';

/** A workflow scheme along with a list of projects that use it. */
export interface WorkflowSchemeAssociations {
  /** The list of projects that use the workflow scheme. */
  projectIds: string[];
  workflowScheme?: WorkflowScheme;
}
