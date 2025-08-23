import type { Client } from '../client';
import type { Request } from '../request';
import type { CreateProjectWithCustomTemplateParameters } from './parameters/createProjectWithCustomTemplateParameters';
import type { EditTemplateParameters } from './parameters/editTemplateParameters';
import type { LiveTemplateParameters } from './parameters/liveTemplateParameters';
import type { RemoveTemplateParameters } from './parameters/removeTemplateParameters';
import type { SaveTemplateParameters } from './parameters/saveTemplateParameters';

export class ProjectTemplates {
  constructor(private client: Client) {}
  /**
   * Creates a project based on a custom template provided in the request. *
   *
   * - The request body should contain the project details and the capabilities that comprise the project:
   * -
   * - - `details` - represents the project details settings
   * - - `template` - represents a list of capabilities responsible for creating specific parts of a project
   * -
   * - A capability is defined as a unit of configuration for the project you want to create.
   * -
   * - This operation is:
   * -
   * - - [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *       `Location` link in the response header to determine the status of the task and use [Get
   *       task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   * -
   * - _**Note: This API is only supported for Jira Enterprise edition.**_
   */
  async createProjectWithCustomTemplate(parameters: CreateProjectWithCustomTemplateParameters) {
    const request: Request = {
      url: '/rest/api/2/project-template',
      method: 'POST',
      body: {
        details: parameters.details,
        template: parameters.template,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Edit custom template *
   *
   * - This API endpoint allows you to edit an existing customised template.
   * -
   * - _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async editTemplate(parameters: EditTemplateParameters) {
    const request: Request = {
      url: '/rest/api/2/project-template/edit-template',
      method: 'PUT',
      body: {
        templateDescription: parameters.templateDescription,
        templateGenerationOptions: parameters.templateGenerationOptions,
        templateKey: parameters.templateKey,
        templateName: parameters.templateName,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Get custom template *
   *
   * - This API endpoint allows you to get a live custom project template details by either templateKey or projectId
   * -
   * - _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async liveTemplate(parameters: LiveTemplateParameters) {
    const request: Request = {
      url: '/rest/api/2/project-template/live-template',
      method: 'GET',
      query: {
        projectId: parameters.projectId,
        templateKey: parameters.templateKey,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Remove custom template *
   *
   * - This API endpoint allows you to remove a specified customised template
   * -
   * - _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async removeTemplate(parameters: RemoveTemplateParameters) {
    const request: Request = {
      url: '/rest/api/2/project-template/remove-template',
      method: 'DELETE',
      query: {
        templateKey: parameters.templateKey,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Save custom template *
   *
   * - This API endpoint allows you to save a customised template
   * -
   * - _**Note: Custom Templates are only supported for Jira Enterprise edition.**_
   */
  async saveTemplate(parameters: SaveTemplateParameters) {
    const request: Request = {
      url: '/rest/api/2/project-template/save-template',
      method: 'POST',
      body: {
        templateDescription: parameters.templateDescription,
        templateFromProjectRequest: parameters.templateFromProjectRequest,
        templateName: parameters.templateName,
      },
    };

    return this.client.sendRequest(request);
  }
}
