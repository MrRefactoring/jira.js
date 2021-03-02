import { WorklogIdsRequestBean } from '../models';

export interface GetWorklogsForIds extends WorklogIdsRequestBean {
  /** Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog. */
  expand?: string;
}
