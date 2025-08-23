import type { Client } from '../client';
import type { Request } from '../request';
import type { RemoveDefaultProjectClassificationParameters } from './parameters/removeDefaultProjectClassificationParameters';
import type { GetDefaultProjectClassificationParameters } from './parameters/getDefaultProjectClassificationParameters';
import type { UpdateDefaultProjectClassificationParameters } from './parameters/updateDefaultProjectClassificationParameters';

export class ProjectClassificationLevels {
  constructor(private client: Client) {}
  /**
   * Remove the default data classification level for a project. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - - _Administer jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeDefaultProjectClassification(parameters: RemoveDefaultProjectClassificationParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/classification-level/default`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the default data classification for a project. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - - _Administer jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getDefaultProjectClassification(parameters: GetDefaultProjectClassificationParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/classification-level/default`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the default data classification level for a project. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - - _Administer jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultProjectClassification(parameters: UpdateDefaultProjectClassificationParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/classification-level/default`,
      method: 'PUT',
      body: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(request);
  }
}
