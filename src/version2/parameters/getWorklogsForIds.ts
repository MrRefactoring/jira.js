import type { WorklogIdsRequest } from '../models';

export interface GetWorklogsForIds extends WorklogIdsRequest {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information about worklogs in the response. This parameter accepts `properties` that returns the properties of each
   * worklog.
   */
  expand?: string;
}
