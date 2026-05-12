import { AuditRecordsSchema, type AuditRecords } from '#/models/auditRecords';
import { type GetAuditRecords } from '#/parameters/getAuditRecords';
import { type Client, type SendRequestOptions } from '@jira.js/base';

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
 * - Created or or before a date and time.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getAuditRecords(client: Client, parameters?: GetAuditRecords): Promise<AuditRecords> {
  const config: SendRequestOptions<AuditRecords> = {
    url: '/rest/api/3/auditing/record',
    method: 'GET',
    searchParams: {
      offset: parameters?.offset,
      limit: parameters?.limit,
      filter: parameters?.filter,
      from: parameters?.from,
      to: parameters?.to,
    },
    schema: AuditRecordsSchema,
  };

  return await client.sendRequest(config);
}
