import { WorklogIdsRequestBean } from '../models';

export interface GetWorklogsForIds extends WorklogIdsRequestBean {
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#expansion) to include additional
   * information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog.
   */
  expand?: string;
}
