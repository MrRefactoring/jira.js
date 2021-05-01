import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectAvatars {
  constructor(private client: Client) {
  }

  /**
   * Sets the avatar displayed for a project.
   *
   * Use [Load project avatar](#api-rest-api-2-project-projectIdOrKey-avatar2-post) to store avatars against the project, before using this operation to set the displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg). */
  async updateProjectAvatar<T = void>(parameters: Parameters.UpdateProjectAvatar, callback: Callback<T>): Promise<void>;
  /**
   * Sets the avatar displayed for a project.
   *
   * Use [Load project avatar](#api-rest-api-2-project-projectIdOrKey-avatar2-post) to store avatars against the project, before using this operation to set the displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg). */
  async updateProjectAvatar<T = void>(parameters: Parameters.UpdateProjectAvatar, callback?: never): Promise<T>;
  async updateProjectAvatar<T = void>(parameters: Parameters.UpdateProjectAvatar, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar`,
      method: 'PUT',
      data: {
        id: parameters.id,
        owner: parameters.owner,
        isSystemAvatar: parameters.isSystemAvatar,
        isSelected: parameters.isSelected,
        isDeletable: parameters.isDeletable,
        fileName: parameters.fileName,
        urls: parameters.urls,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectAvatars.updateProjectAvatar' });
  }

  /**
   * Deletes a custom avatar from a project. Note that system avatars cannot be deleted.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg). */
  async deleteProjectAvatar<T = void>(parameters: Parameters.DeleteProjectAvatar, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a custom avatar from a project. Note that system avatars cannot be deleted.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg). */
  async deleteProjectAvatar<T = void>(parameters: Parameters.DeleteProjectAvatar, callback?: never): Promise<T>;
  async deleteProjectAvatar<T = void>(parameters: Parameters.DeleteProjectAvatar, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectAvatars.deleteProjectAvatar' });
  }

  /**
   * Loads an avatar for a project.
   *
   * Specify the avatar's local file location in the body of the request. Also, include the following headers:
   *
   *  *  `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special Headers](#special-request-headers).
   *  *  `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
   *
   * For example:
   * `curl --request POST `
   *
   * `--user email@example.com:<api_token> `
   *
   * `--header 'X-Atlassian-Token: no-check' `
   *
   * `--header 'Content-Type: image/< image_type>' `
   *
   * `--data-binary "<@/path/to/file/with/your/avatar>" `
   *
   * `--url 'https://your-domain.atlassian.net/rest/api/2/project/{projectIdOrKey}/avatar2'`
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar use [Set project avatar](#api-rest-api-2-project-projectIdOrKey-avatar-put) to set it as the project's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg). */
  async createProjectAvatar<T = Models.Avatar>(parameters: Parameters.CreateProjectAvatar, callback: Callback<T>): Promise<void>;
  /**
   * Loads an avatar for a project.
   *
   * Specify the avatar's local file location in the body of the request. Also, include the following headers:
   *
   *  *  `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special Headers](#special-request-headers).
   *  *  `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
   *
   * For example:
   * `curl --request POST `
   *
   * `--user email@example.com:<api_token> `
   *
   * `--header 'X-Atlassian-Token: no-check' `
   *
   * `--header 'Content-Type: image/< image_type>' `
   *
   * `--data-binary "<@/path/to/file/with/your/avatar>" `
   *
   * `--url 'https://your-domain.atlassian.net/rest/api/2/project/{projectIdOrKey}/avatar2'`
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar use [Set project avatar](#api-rest-api-2-project-projectIdOrKey-avatar-put) to set it as the project's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg). */
  async createProjectAvatar<T = Models.Avatar>(parameters: Parameters.CreateProjectAvatar, callback?: never): Promise<T>;
  async createProjectAvatar<T = Models.Avatar>(parameters: Parameters.CreateProjectAvatar, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar2`,
      method: 'POST',
      params: {
        x: parameters.x,
        y: parameters.y,
        size: parameters.size,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectAvatars.createProjectAvatar' });
  }

  /**
   * Returns all project avatars, grouped by system and custom avatars.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getAllProjectAvatars<T = Models.ProjectAvatars>(parameters: Parameters.GetAllProjectAvatars, callback: Callback<T>): Promise<void>;
  /**
   * Returns all project avatars, grouped by system and custom avatars.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getAllProjectAvatars<T = Models.ProjectAvatars>(parameters: Parameters.GetAllProjectAvatars, callback?: never): Promise<T>;
  async getAllProjectAvatars<T = Models.ProjectAvatars>(parameters: Parameters.GetAllProjectAvatars, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatars`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.projectAvatars.getAllProjectAvatars' });
  }
}
