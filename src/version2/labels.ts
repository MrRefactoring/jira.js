import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAllLabelsParameters } from './parameters/getAllLabelsParameters';

export class Labels {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * labels.
   */
  async getAllLabels(parameters: GetAllLabelsParameters) {
    const request: Request = {
      url: '/rest/api/2/label',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }
}
