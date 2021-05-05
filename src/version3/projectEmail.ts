import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectEmail {
  constructor(private client: Client) {
  }

  /**
   * Returns the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: Parameters.GetProjectEmail, callback: Callback<T>): Promise<void>;
  /**
   * Returns the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: Parameters.GetProjectEmail, callback?: never): Promise<T>;
  async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: Parameters.GetProjectEmail, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectId}/email`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectEmail.getProjectEmail' });
  }

  /**
   * Sets the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
   *
   * If `emailAddress` is an empty string, the default email address is restored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async updateProjectEmail<T = void>(parameters: Parameters.UpdateProjectEmail, callback: Callback<T>): Promise<void>;
  /**
   * Sets the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
   *
   * If `emailAddress` is an empty string, the default email address is restored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async updateProjectEmail<T = void>(parameters: Parameters.UpdateProjectEmail, callback?: never): Promise<T>;
  async updateProjectEmail<T = void>(parameters: Parameters.UpdateProjectEmail, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectId}/email`,
      method: 'PUT',
      data: {
        emailAddress: parameters.emailAddress,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectEmail.updateProjectEmail' });
  }
}
