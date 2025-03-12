import type { WorkflowUpdateRequest } from '../models';

export interface UpdateWorkflows extends WorkflowUpdateRequest {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * `workflows.usages` Returns the project and issue types that each workflow is associated with. `statuses.usages`
   * Returns the project and issue types that each status is associated with.
   */
  expand?: string;
}
