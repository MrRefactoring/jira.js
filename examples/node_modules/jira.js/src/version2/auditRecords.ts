import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class AuditRecords {
  constructor(private client: Client) {}

  /**
   * Returns a list of audit records. The list can be filtered to include items:
   *
   * - Where each item in `filter` has at least one match in any of these fields:
   *
   *   - `summary`
   *   - `category`
   *   - `eventSource`
   *   - `objectItem.name` If the object is a user, account ID is available to filter.
   *   - `objectItem.parentName`
   *   - `objectItem.typeName`
   *   - `changedValues.changedFrom`
   *   - `changedValues.changedTo`
   *   - `remoteAddress`
   *
   *   For example, if `filter` contains _man ed_, an audit record containing `summary": "User added to group"` and
   *   `"category": "group management"` is returned.
   * - Created on or after a date and time.
   * - Created on or before a date and time.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAuditRecords<T = Models.AuditRecords>(
    parameters: Parameters.GetAuditRecords | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of audit records. The list can be filtered to include items:
   *
   * - Where each item in `filter` has at least one match in any of these fields:
   *
   *   - `summary`
   *   - `category`
   *   - `eventSource`
   *   - `objectItem.name` If the object is a user, account ID is available to filter.
   *   - `objectItem.parentName`
   *   - `objectItem.typeName`
   *   - `changedValues.changedFrom`
   *   - `changedValues.changedTo`
   *   - `remoteAddress`
   *
   *   For example, if `filter` contains _man ed_, an audit record containing `summary": "User added to group"` and
   *   `"category": "group management"` is returned.
   * - Created on or after a date and time.
   * - Created on or before a date and time.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAuditRecords<T = Models.AuditRecords>(parameters?: Parameters.GetAuditRecords, callback?: never): Promise<T>;
  async getAuditRecords<T = Models.AuditRecords>(
    parameters?: Parameters.GetAuditRecords,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/auditing/record',
      method: 'GET',
      params: {
        offset: parameters?.offset,
        limit: parameters?.limit,
        filter: parameters?.filter,
        from: parameters?.from,
        to: parameters?.to,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
