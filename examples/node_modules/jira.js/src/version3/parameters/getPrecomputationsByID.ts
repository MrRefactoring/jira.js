import type { JqlFunctionPrecomputationGetByIdRequest } from '../models';

export interface GetPrecomputationsByID extends JqlFunctionPrecomputationGetByIdRequest {
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#ordering) the results by a field:
   *
   * - `functionKey` Sorts by the functionKey.
   * - `used` Sorts by the used timestamp.
   * - `created` Sorts by the created timestamp.
   * - `updated` Sorts by the updated timestamp.
   *
   * You can also use `+` or `-` prefixes to specify ascending or descending order (e.g., `+functionKey`, `-used`).
   */
  orderBy?:
    | 'functionKey'
    | 'used'
    | 'created'
    | 'updated'
    | '+functionKey'
    | '+used'
    | '+created'
    | '+updated'
    | '-functionKey'
    | '-used'
    | '-created'
    | '-updated'
    | string;
}
