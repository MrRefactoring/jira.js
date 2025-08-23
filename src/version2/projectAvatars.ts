import type { Client } from '../client';
import type { Request } from '../request';
import type { UpdateProjectAvatarParameters } from './parameters/updateProjectAvatarParameters';
import type { DeleteProjectAvatarParameters } from './parameters/deleteProjectAvatarParameters';
import type { CreateProjectAvatarParameters } from './parameters/createProjectAvatarParameters';
import type { GetAllProjectAvatarsParameters } from './parameters/getAllProjectAvatarsParameters';

export class ProjectAvatars {
  constructor(private client: Client) {}
  /**
   * Sets the avatar displayed for a project. *
   *
   * - Use [Load project avatar](#api-rest-api-2-project-projectIdOrKey-avatar2-post) to store avatars against the
   *   project, before using this operation to set the displayed avatar.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async updateProjectAvatar(parameters: UpdateProjectAvatarParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar`,
      method: 'PUT',
      body: {
        fileName: parameters.fileName,
        id: parameters.id,
        isDeletable: parameters.isDeletable,
        isSelected: parameters.isSelected,
        isSystemAvatar: parameters.isSystemAvatar,
        owner: parameters.owner,
        urls: parameters.urls,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a custom avatar from a project. Note that system avatars cannot be deleted. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async deleteProjectAvatar(parameters: DeleteProjectAvatarParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Loads an avatar for a project. *
   *
   * - Specify the avatar's local file location in the body of the request. Also, include the following headers:
   * -
   * - - `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special
   *       Headers](#special-request-headers).
   * - - `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
   * -
   * - For example:
   * - `curl --request POST `
   * -
   * - `--user email@example.com:<api_token> `
   * -
   * - `--header 'X-Atlassian-Token: no-check' `
   * -
   * - `--header 'Content-Type: image/< image_type>' `
   * -
   * - `--data-binary "<@/path/to/file/with/your/avatar>" `
   * -
   * - `--url 'https://your-domain.atlassian.net/rest/api/2/project/{projectIdOrKey}/avatar2'`
   * -
   * - The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   *   the image. The length of the square's sides is set to the smaller of the height or width of the image.
   * -
   * - The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   * -
   * - After creating the avatar use [Set project
   *   avatar](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-avatars/#api-rest-api-2-project-projectidorkey-avatar-put)
   *   to set it as the project's displayed avatar.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async createProjectAvatar(parameters: CreateProjectAvatarParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatar2`,
      method: 'POST',
      query: {
        x: parameters.x,
        y: parameters.y,
        size: parameters.size,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns all project avatars, grouped by system and custom avatars. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getAllProjectAvatars(parameters: GetAllProjectAvatarsParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/avatars`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
