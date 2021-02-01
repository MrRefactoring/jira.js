import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectEmail {
  constructor(private client: Client) { }
  /**
     * Returns the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: Parameters.GetProjectEmail, callback: Callback<T>): Promise<void>;
  /**
     * Returns the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: Parameters.GetProjectEmail, callback?: undefined): Promise<T>;
  async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: Parameters.GetProjectEmail, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/${parameters.projectId}/email`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getProjectEmail' });
  }
  /**
     * Sets the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
     *
     * If `emailAddress` is an empty string, the default email address is restored.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async updateProjectEmail<T = void>(parameters: Parameters.UpdateProjectEmail, callback: Callback<T>): Promise<void>;
  /**
     * Sets the [project's sender email address](https://confluence.atlassian.com/x/dolKLg).
     *
     * If `emailAddress` is an empty string, the default email address is restored.
     *
     * **[Permissions](#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async updateProjectEmail<T = void>(parameters: Parameters.UpdateProjectEmail, callback?: undefined): Promise<T>;
  async updateProjectEmail<T = void>(parameters: Parameters.UpdateProjectEmail, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/${parameters.projectId}/email`,
      method: 'PUT',
      data: {
        emailAddress: parameters.emailAddress,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'updateProjectEmail' });
  }
}
