import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAllUserDataClassificationLevelsParameters } from './parameters/getAllUserDataClassificationLevelsParameters';

export class ClassificationLevels {
  constructor(private client: Client) {}
  /**
   * Returns all classification levels. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAllUserDataClassificationLevels(parameters: GetAllUserDataClassificationLevelsParameters) {
    const request: Request = {
      url: '/rest/api/2/classification-levels',
      method: 'GET',
      query: {
        status: parameters.status,
        orderBy: parameters.orderBy,
      },
    };

    return this.client.sendRequest(request);
  }
}
