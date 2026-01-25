import type { WorkflowHistoryListRequest } from '../models';

export interface ListWorkflowHistory extends WorkflowHistoryListRequest {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `includeIntermediateWorkflows` Includes intermediate workflow versions that are sometimes created during workflow
   *   updates or migrations. By default, these are omitted from the response.
   */
  expand?: 'includeIntermediateWorkflows' | string;
}
