import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class ProjectTemplates {
  constructor(private client: Client) {}

  /**
   * Creates a project based on a custom template provided in the request.
   *
   * The request body should contain the project details and the capabilities that comprise the project:
   *
   * - `details` - represents the project details settings
   * - `template` - represents a list of capabilities responsible for creating specific parts of a project
   *
   * A capability is defined as a unit of configuration for the project you want to create.
   *
   * This operation is:
   *
   * - [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *   `Location` link in the response header to determine the status of the task and use [Get
   *   task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   *
   * _**Note: This API is only supported for Jira Enterprise edition.**_
   */
  async createProjectWithCustomTemplate<T = unknown>(
    parameters: Parameters.CreateProjectWithCustomTemplate | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a project based on a custom template provided in the request.
   *
   * The request body should contain the project details and the capabilities that comprise the project:
   *
   * - `details` - represents the project details settings
   * - `template` - represents a list of capabilities responsible for creating specific parts of a project
   *
   * A capability is defined as a unit of configuration for the project you want to create.
   *
   * This operation is:
   *
   * - [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *   `Location` link in the response header to determine the status of the task and use [Get
   *   task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   *
   * _**Note: This API is only supported for Jira Enterprise edition.**_
   */
  async createProjectWithCustomTemplate<T = unknown>(
    parameters?: Parameters.CreateProjectWithCustomTemplate,
    callback?: never,
  ): Promise<T>;
  async createProjectWithCustomTemplate<T = unknown>(
    parameters?: Parameters.CreateProjectWithCustomTemplate,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/project-template',
      method: 'POST',
      data: {
        details: parameters?.details,
        template: parameters?.template,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
