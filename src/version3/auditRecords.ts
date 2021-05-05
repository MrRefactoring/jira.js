import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class AuditRecords {
  constructor(private client: Client) {
  }

  /**
   * Returns a list of audit records. The list can be filtered to include items:
   *
   *  *  containing a string in at least one field. For example, providing *up* will return all audit records where one or more fields contains words such as *update*.
   *  *  created on or after a date and time.
   *  *  created or or before a date and time.
   *  *  created during a time period.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAuditRecords<T = Models.AuditRecords>(parameters: Parameters.GetAuditRecords | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of audit records. The list can be filtered to include items:
   *
   *  *  containing a string in at least one field. For example, providing *up* will return all audit records where one or more fields contains words such as *update*.
   *  *  created on or after a date and time.
   *  *  created or or before a date and time.
   *  *  created during a time period.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAuditRecords<T = Models.AuditRecords>(parameters?: Parameters.GetAuditRecords, callback?: never): Promise<T>;
  async getAuditRecords<T = Models.AuditRecords>(parameters?: Parameters.GetAuditRecords, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/auditing/record',
      method: 'GET',
      params: {
        offset: parameters?.offset,
        limit: parameters?.limit,
        filter: parameters?.filter,
        from: parameters?.from,
        to: parameters?.to,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.auditRecords.getAuditRecords' });
  }
}
