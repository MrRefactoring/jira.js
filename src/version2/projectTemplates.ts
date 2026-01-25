import type * as Models from './models';
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

  /**
   * @experimental
   *
   * Edit custom template
   *
   * This API endpoint allows you to edit an existing customised template.
   *
   * _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async editTemplate<T = unknown>(parameters: Parameters.EditTemplate, callback: Callback<T>): Promise<void>;
  /**
   * @experimental
   *
   * Edit custom template
   *
   * This API endpoint allows you to edit an existing customised template.
   *
   * _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async editTemplate<T = unknown>(parameters: Parameters.EditTemplate, callback?: never): Promise<T>;
  async editTemplate<T = unknown>(parameters: Parameters.EditTemplate, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/project-template/edit-template',
      method: 'PUT',
      data: {
        templateDescription: parameters.templateDescription,
        templateGenerationOptions: parameters.templateGenerationOptions,
        templateKey: parameters.templateKey,
        templateName: parameters.templateName,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Get custom template
   *
   * This API endpoint allows you to get a live custom project template details by either templateKey or projectId
   *
   * _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async liveTemplate<T = Models.ProjectTemplateModel>(
    parameters: Parameters.LiveTemplate,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Get custom template
   *
   * This API endpoint allows you to get a live custom project template details by either templateKey or projectId
   *
   * _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async liveTemplate<T = Models.ProjectTemplateModel>(
    parameters: Parameters.LiveTemplate,
    callback?: never,
  ): Promise<T>;
  async liveTemplate<T = Models.ProjectTemplateModel>(
    parameters: Parameters.LiveTemplate,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/project-template/live-template',
      method: 'GET',
      params: {
        projectId: parameters.projectId,
        templateKey: parameters.templateKey,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Remove custom template
   *
   * This API endpoint allows you to remove a specified customised template
   *
   * _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async removeTemplate<T = unknown>(parameters: Parameters.RemoveTemplate, callback: Callback<T>): Promise<void>;
  /**
   * @experimental
   *
   * Remove custom template
   *
   * This API endpoint allows you to remove a specified customised template
   *
   * _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async removeTemplate<T = unknown>(parameters: Parameters.RemoveTemplate, callback?: never): Promise<T>;
  async removeTemplate<T = unknown>(parameters: Parameters.RemoveTemplate, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/project-template/remove-template',
      method: 'DELETE',
      params: {
        templateKey: parameters.templateKey,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @experimental
   *
   * Save custom template
   *
   * This API endpoint allows you to save a customised template
   *
   * _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async saveTemplate<T = Models.SaveTemplateResponse>(
    parameters: Parameters.SaveTemplate,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @experimental
   *
   * Save custom template
   *
   * This API endpoint allows you to save a customised template
   *
   * _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async saveTemplate<T = Models.SaveTemplateResponse>(
    parameters: Parameters.SaveTemplate,
    callback?: never,
  ): Promise<T>;
  async saveTemplate<T = Models.SaveTemplateResponse>(
    parameters: Parameters.SaveTemplate,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/project-template/save-template',
      method: 'POST',
      data: {
        templateDescription: parameters.templateDescription,
        templateFromProjectRequest: parameters.templateFromProjectRequest,
        templateName: parameters.templateName,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
