import type { WorkflowSchemeReadRequest } from '../models';

export interface ReadWorkflowSchemes extends WorkflowSchemeReadRequest {
  /**
   * Deprecated. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2298) for details.
   *
   *     Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * `workflows.usages` Returns the project and issue types that each workflow in the workflow scheme is associated
   * with.
   */
  expand?: string;
}
