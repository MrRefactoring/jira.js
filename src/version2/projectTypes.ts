import type { Client } from '../client';
import type { Request } from '../request';
import type { GetProjectTypeByKeyParameters } from './parameters/getProjectTypeByKeyParameters';
import type { GetAccessibleProjectTypeByKeyParameters } from './parameters/getAccessibleProjectTypeByKeyParameters';

export class ProjectTypes {
  constructor(private client: Client) {}
  /**
   * Returns all [project types](https://confluence.atlassian.com/x/Var1Nw), whether or not the instance has a valid
   * license for each type. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAllProjectTypes() {
    const request: Request = {
      url: '/rest/api/2/project/type',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /** Returns all [project types](https://confluence.atlassian.com/x/Var1Nw) with a valid license. */
  async getAllAccessibleProjectTypes() {
    const request: Request = {
      url: '/rest/api/2/project/type/accessible',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [project type](https://confluence.atlassian.com/x/Var1Nw). *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getProjectTypeByKey(parameters: GetProjectTypeByKeyParameters) {
    const request: Request = {
      url: `/rest/api/2/project/type/${parameters.projectTypeKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [project type](https://confluence.atlassian.com/x/Var1Nw) if it is accessible to the user. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getAccessibleProjectTypeByKey(parameters: GetAccessibleProjectTypeByKeyParameters) {
    const request: Request = {
      url: `/rest/api/2/project/type/${parameters.projectTypeKey}/accessible`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
