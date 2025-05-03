import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class ProjectAvatars {
  constructor(private client: Client) {}

  /**
   * Sets the avatar displayed for a project.
   *
   * Use [Load project avatar](#api-rest-api-2-project-projectIdOrKey-avatar2-post) to store avatars against the
   * project, before using this operation to set the displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async updateProjectAvatar<T = void>(parameters: Parameters.UpdateProjectAvatar, callback: Callback<T>): Promise<void>;
  /**
   * Sets the avatar displayed for a project.
   *
   * Use [Load project avatar](#api-rest-api-2-project-projectIdOrKey-avatar2-post) to store avatars against the
   * project, before using this operation to set the displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async updateProjectAvatar<T = void>(parameters: Parameters.UpdateProjectAvatar, callback?: never): Promise<T>;
  async updateProjectAvatar<T = void>(
    parameters: Parameters.UpdateProjectAvatar,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar`,
      method: 'PUT',
      data: {
        fileName: parameters.fileName,
        id: parameters.id,
        isDeletable: parameters.isDeletable,
        isSelected: parameters.isSelected,
        isSystemAvatar: parameters.isSystemAvatar,
        owner: parameters.owner,
        urls: parameters.urls,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a custom avatar from a project. Note that system avatars cannot be deleted.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async deleteProjectAvatar<T = void>(parameters: Parameters.DeleteProjectAvatar, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a custom avatar from a project. Note that system avatars cannot be deleted.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async deleteProjectAvatar<T = void>(parameters: Parameters.DeleteProjectAvatar, callback?: never): Promise<T>;
  async deleteProjectAvatar<T = void>(
    parameters: Parameters.DeleteProjectAvatar,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Loads an avatar for a project.
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   * the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar use [Set project
   * avatar](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-avatars/#api-rest-api-2-project-projectidorkey-avatar-put)
   * to set it as the project's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async createProjectAvatar<T = Models.Avatar>(
    parameters: Parameters.CreateProjectAvatar,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Loads an avatar for a project.
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   * the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar use [Set project
   * avatar](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-avatars/#api-rest-api-2-project-projectidorkey-avatar-put)
   * to set it as the project's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async createProjectAvatar<T = Models.Avatar>(
    parameters: Parameters.CreateProjectAvatar,
    callback?: never,
  ): Promise<T>;
  async createProjectAvatar<T = Models.Avatar>(
    parameters: Parameters.CreateProjectAvatar,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar2`,
      method: 'POST',
      headers: {
        'X-Atlassian-Token': 'no-check',
        'Content-Type': parameters.mimeType,
      },
      params: {
        x: parameters.x,
        y: parameters.y,
        size: parameters.size ?? 0,
      },
      data: parameters.avatar,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all project avatars, grouped by system and custom avatars.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getAllProjectAvatars<T = Models.ProjectAvatars>(
    parameters: Parameters.GetAllProjectAvatars | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all project avatars, grouped by system and custom avatars.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getAllProjectAvatars<T = Models.ProjectAvatars>(
    parameters: Parameters.GetAllProjectAvatars | string,
    callback?: never,
  ): Promise<T>;
  async getAllProjectAvatars<T = Models.ProjectAvatars>(
    parameters: Parameters.GetAllProjectAvatars | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectIdOrKey}/avatars`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
