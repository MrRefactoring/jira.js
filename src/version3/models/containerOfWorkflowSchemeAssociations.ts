import { WorkflowSchemeAssociations } from './workflowSchemeAssociations';

/**
 * A container for a list of workflow schemes together with the projects they are associated with. */
export interface ContainerOfWorkflowSchemeAssociations {
  /** A list of workflow schemes together with projects they are associated with. */
  values: WorkflowSchemeAssociations[];
}
