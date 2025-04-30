import type { IssueLimitReportRequest } from '../models';

export interface GetIssueLimitReport extends IssueLimitReportRequest {
  /**
   * Return issue keys instead of issue ids in the response.
   *
   *     Usage: Add `?isReturningKeys=true` to the end of the path to request issue keys.
   */
  isReturningKeys?: boolean;
}
