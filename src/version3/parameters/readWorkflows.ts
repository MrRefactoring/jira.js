import { WorkflowReadRequest } from '../models';

export interface ReadWorkflows extends WorkflowReadRequest {
  /**
   * Use [expand](#expansion) to include additional information in the response. This parameter accepts a
   * comma-separated list. Expand options include:
   *
   * `workflows.usages` Returns the project and issue types that each workflow is associated with. `statuses.usages`
   * Returns the project and issue types that each status is associated with.
   */
  expand?: string;
  /**
   * Return the new fields (`toStatusReference`/`links`) instead of the deprecated fields (`to`/`from`) for workflow
   * transition port mappings.
   */
  useTransitionLinksFormat?: boolean;
  /**
   * Return the new field `approvalConfiguration` instead of the deprecated status properties for approval
   * configuration.
   */
  useApprovalConfiguration?: boolean;
}
