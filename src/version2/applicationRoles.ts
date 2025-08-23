import type { Client } from '../client';
import type { Request } from '../request';
import type { GetApplicationRoleParameters } from './parameters/getApplicationRoleParameters';

export class ApplicationRoles {
  constructor(private client: Client) {}
  /**
   * Returns all application roles. In Jira, application roles are managed using the [Application access
   * configuration](https://confluence.atlassian.com/x/3YxjL) page. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllApplicationRoles() {
    const request: Request = {
      url: '/rest/api/2/applicationrole',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns an application role. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getApplicationRole(parameters: GetApplicationRoleParameters) {
    const request: Request = {
      url: `/rest/api/2/applicationrole/${parameters.key}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
