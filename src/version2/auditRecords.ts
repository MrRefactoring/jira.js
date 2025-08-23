import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAuditRecordsParameters } from './parameters/getAuditRecordsParameters';

export class AuditRecords {
  constructor(private client: Client) {}
  /**
   * Returns a list of audit records. The list can be filtered to include items: *
   *
   * - - Where each item in `filter` has at least one match in any of these fields:
   * -
   * - - `summary`
   * - - `category`
   * - - `eventSource`
   * - - `objectItem.name` If the object is a user, account ID is available to filter.
   * - - `objectItem.parentName`
   * - - `objectItem.typeName`
   * - - `changedValues.changedFrom`
   * - - `changedValues.changedTo`
   * - - `remoteAddress`
   * -
   * - For example, if `filter` contains _man ed_, an audit record containing `summary": "User added to group"` and
   *   `"category": "group management"` is returned.
   * - - Created on or after a date and time.
   * - - Created or or before a date and time.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAuditRecords(parameters: GetAuditRecordsParameters) {
    const request: Request = {
      url: '/rest/api/2/auditing/record',
      method: 'GET',
      query: {
        offset: parameters.offset,
        limit: parameters.limit,
        filter: parameters.filter,
        from: parameters.from,
        to: parameters.to,
      },
    };

    return this.client.sendRequest(request);
  }
}
