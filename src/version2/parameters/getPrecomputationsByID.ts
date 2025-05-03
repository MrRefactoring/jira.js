import type { JqlFunctionPrecomputationGetByIdRequest } from '../models';

export interface GetPrecomputationsByID extends JqlFunctionPrecomputationGetByIdRequest {
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * `functionKey` Sorts by the functionKey. `used` Sorts by the used timestamp. `created` Sorts by the created
   * timestamp. `updated` Sorts by the updated timestamp.
   */
  orderBy?: string;
}
