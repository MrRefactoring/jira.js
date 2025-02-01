import { WorkflowSchemeReadRequest } from '../models';

export interface ReadWorkflowSchemes extends WorkflowSchemeReadRequest {
  /**
   * Use [expand](#expansion) to include additional information in the response. This parameter accepts a
   * comma-separated list. Expand options include:
   *
   * `workflows.usages` Returns the project and issue types that each workflow in the workflow scheme is associated
   * with.
   */
  expand?: 'workflows.usages' | string;
}
