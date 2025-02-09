import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ClassificationLevels {
  constructor(private client: Client) {}
  /**
   * Returns all classification levels.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAllUserDataClassificationLevels<T = Models.DataClassificationLevels>(
    parameters: Parameters.GetAllUserDataClassificationLevels | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all classification levels.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAllUserDataClassificationLevels<T = Models.DataClassificationLevels>(
    parameters?: Parameters.GetAllUserDataClassificationLevels,
    callback?: never,
  ): Promise<T>;
  async getAllUserDataClassificationLevels<T = Models.DataClassificationLevels>(
    parameters?: Parameters.GetAllUserDataClassificationLevels,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/classification-levels',
      method: 'GET',
      params: {
        status: parameters?.status,
        orderBy: parameters?.orderBy,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
