import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class Api {
  constructor(private client: Client) {}

  /**
   * @experimental
   *
   * Returns worklog details for a list of issue ID and worklog ID pairs.
   *
   * This is an internal API for bulk fetching worklogs by their issue and worklog IDs. Worklogs that don't exist will
   * be filtered out from the response.
   *
   * The returned list of worklogs is limited to 1000 items.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** This is
   * an internal service-to-service API that requires ASAP authentication. No user permission checks are performed as
   * this bypasses normal user context.
   */
  async getWorklogsByIssueIdAndWorklogId<T = Models.BulkWorklogKeyResponse>(
    parameters: Parameters.GetWorklogsByIssueIdAndWorklogId,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Returns worklog details for a list of issue ID and worklog ID pairs.
   *
   * This is an internal API for bulk fetching worklogs by their issue and worklog IDs. Worklogs that don't exist will
   * be filtered out from the response.
   *
   * The returned list of worklogs is limited to 1000 items.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** This is
   * an internal service-to-service API that requires ASAP authentication. No user permission checks are performed as
   * this bypasses normal user context.
   */
  async getWorklogsByIssueIdAndWorklogId<T = Models.BulkWorklogKeyResponse>(
    parameters: Parameters.GetWorklogsByIssueIdAndWorklogId,
    callback?: never,
  ): Promise<T>;
  async getWorklogsByIssueIdAndWorklogId<T = Models.BulkWorklogKeyResponse>(
    parameters: Parameters.GetWorklogsByIssueIdAndWorklogId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/internal/api/latest/worklog/bulk',
      method: 'POST',
      data: {
        requests: parameters.requests,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
