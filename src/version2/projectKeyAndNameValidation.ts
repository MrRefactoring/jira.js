import type { Client } from '../client';
import type { Request } from '../request';
import type { ValidateProjectKeyParameters } from './parameters/validateProjectKeyParameters';
import type { GetValidProjectKeyParameters } from './parameters/getValidProjectKeyParameters';
import type { GetValidProjectNameParameters } from './parameters/getValidProjectNameParameters';

export class ProjectKeyAndNameValidation {
  constructor(private client: Client) {}
  /**
   * Validates a project key by confirming the key is a valid string and not in use. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async validateProjectKey(parameters: ValidateProjectKeyParameters) {
    const request: Request = {
      url: '/rest/api/2/projectvalidate/key',
      method: 'GET',
      query: {
        key: parameters.key,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Validates a project key and, if the key is invalid or in use, generates a valid random string for the project key.
   * *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getValidProjectKey(parameters: GetValidProjectKeyParameters) {
    const request: Request = {
      url: '/rest/api/2/projectvalidate/validProjectKey',
      method: 'GET',
      query: {
        key: parameters.key,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Checks that a project name isn't in use. If the name isn't in use, the passed string is returned. If the name is in
   * use, this operation attempts to generate a valid project name based on the one supplied, usually by adding a
   * sequence number. If a valid project name cannot be generated, a 404 response is returned. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getValidProjectName(parameters: GetValidProjectNameParameters) {
    const request: Request = {
      url: '/rest/api/2/projectvalidate/validProjectName',
      method: 'GET',
      query: {
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }
}
