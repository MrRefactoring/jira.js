import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class ProjectEmail {
  constructor(private client: Client) {}

  /**
   * Returns the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectEmail<T = Models.ProjectEmailAddress>(
    parameters: Parameters.GetProjectEmail | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectEmail<T = Models.ProjectEmailAddress>(
    parameters: Parameters.GetProjectEmail | string,
    callback?: never,
  ): Promise<T>;
  async getProjectEmail<T = Models.ProjectEmailAddress>(
    parameters: Parameters.GetProjectEmail | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectId = typeof parameters === 'string' ? parameters : parameters.projectId;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectId}/email`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
   *
   * If `emailAddress` is an empty string, the default email address is restored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateProjectEmail<T = void>(parameters: Parameters.UpdateProjectEmail, callback: Callback<T>): Promise<void>;
  /**
   * Sets the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
   *
   * If `emailAddress` is an empty string, the default email address is restored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateProjectEmail<T = void>(parameters: Parameters.UpdateProjectEmail, callback?: never): Promise<T>;
  async updateProjectEmail<T = void>(
    parameters: Parameters.UpdateProjectEmail,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectId}/email`,
      method: 'PUT',
      data: {
        emailAddress: parameters.emailAddress,
        emailAddressStatus: parameters.emailAddressStatus,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
