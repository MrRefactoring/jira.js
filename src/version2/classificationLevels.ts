import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { Request } from '../request';

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
  ): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/2/classification-levels',
      method: 'GET',
      query: {
        status: parameters?.status,
        orderBy: parameters?.orderBy,
      },
    };

    return this.client.sendRequest(config);
  }
}
