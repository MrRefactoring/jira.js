import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class RequestType {
  constructor(private client: Client) {}

  /**
   * This method returns all customer request types used in the Jira Service Management instance, optionally filtered by
   * a query string.
   *
   * Use [servicedeskapi/servicedesk/{serviceDeskId}/requesttype](#api-servicedesk-serviceDeskId-requesttype-get) to
   * find the customer request types supported by a specific service desk.
   *
   * The returned list of customer request types can be filtered using the `query` parameter. The parameter is matched
   * against the customer request types' `name` or `description`. For example, searching for "Install", "Inst", "Equi",
   * or "Equipment" will match a customer request type with the _name_ "Equipment Installation Request".
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   */
  async getAllRequestTypes<T = Models.PagedRequestType>(
    parameters: Parameters.GetAllRequestTypes | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * This method returns all customer request types used in the Jira Service Management instance, optionally filtered by
   * a query string.
   *
   * Use [servicedeskapi/servicedesk/{serviceDeskId}/requesttype](#api-servicedesk-serviceDeskId-requesttype-get) to
   * find the customer request types supported by a specific service desk.
   *
   * The returned list of customer request types can be filtered using the `query` parameter. The parameter is matched
   * against the customer request types' `name` or `description`. For example, searching for "Install", "Inst", "Equi",
   * or "Equipment" will match a customer request type with the _name_ "Equipment Installation Request".
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   */
  async getAllRequestTypes<T = Models.PagedRequestType>(
    parameters?: Parameters.GetAllRequestTypes,
    callback?: never
  ): Promise<T>;
  async getAllRequestTypes<T = Models.PagedRequestType>(
    parameters?: Parameters.GetAllRequestTypes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/servicedeskapi/requesttype',
      method: 'GET',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
      params: {
        searchQuery: parameters?.searchQuery,
        serviceDeskId: parameters?.serviceDeskId,
        start: parameters?.start,
        limit: parameters?.limit,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
