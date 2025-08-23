import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAllSystemAvatarsParameters } from './parameters/getAllSystemAvatarsParameters';
import type { GetAvatarsParameters } from './parameters/getAvatarsParameters';
import type { StoreAvatarParameters } from './parameters/storeAvatarParameters';
import type { DeleteAvatarParameters } from './parameters/deleteAvatarParameters';
import type { GetAvatarImageByTypeParameters } from './parameters/getAvatarImageByTypeParameters';
import type { GetAvatarImageByIDParameters } from './parameters/getAvatarImageByIDParameters';
import type { GetAvatarImageByOwnerParameters } from './parameters/getAvatarImageByOwnerParameters';

export class Avatars {
  constructor(private client: Client) {}
  /**
   * Returns a list of system avatar details by owner type, where the owner types are issue type, project, user or
   * priority. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAllSystemAvatars(parameters: GetAllSystemAvatarsParameters) {
    const request: Request = {
      url: `/rest/api/2/avatar/${parameters.type}/system`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the system and custom avatars for a project, issue type or priority. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
   *       the project the avatar belongs to.
   * - - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg)
   *       for at least one project the issue type is used in.
   * - - For system avatars, none.
   * - - For priority avatars, none.
   */
  async getAvatars(parameters: GetAvatarsParameters) {
    const request: Request = {
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Loads a custom avatar for a project, issue type or priority. *
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
   * - `--url 'https://your-domain.atlassian.net/rest/api/2/universal_avatar/type/{type}/owner/{entityId}'`
   * -
   * - The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   *   the image. The length of the square's sides is set to the smaller of the height or width of the image.
   * -
   * - The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   * -
   * - After creating the avatar use:
   * -
   * - - [Update issue
   *       type](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-types/#api-rest-api-2-issuetype-id-put)
   *       to set it as the issue type's displayed avatar.
   * - - [Set project
   *       avatar](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-avatars/#api-rest-api-2-project-projectidorkey-avatar-put)
   *       to set it as the project's displayed avatar.
   * - - [Update
   *       priority](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-priorities/#api-rest-api-2-priority-id-put)
   *       to set it as the priority's displayed avatar.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async storeAvatar(parameters: StoreAvatarParameters) {
    const request: Request = {
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
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
   * Deletes an avatar from a project, issue type or priority. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteAvatar(parameters: DeleteAvatarParameters) {
    const request: Request = {
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}/avatar/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the default project, issue type or priority avatar image. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAvatarImageByType(parameters: GetAvatarImageByTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/universal_avatar/view/type/${parameters.type}`,
      method: 'GET',
      query: {
        size: parameters.size,
        format: parameters.format,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a project, issue type or priority avatar image by ID. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - For system avatars, none.
   * - - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
   *       the project the avatar belongs to.
   * - - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg)
   *       for at least one project the issue type is used in.
   * - - For priority avatars, none.
   */
  async getAvatarImageByID(parameters: GetAvatarImageByIDParameters) {
    const request: Request = {
      url: `/rest/api/2/universal_avatar/view/type/${parameters.type}/avatar/${parameters.id}`,
      method: 'GET',
      query: {
        size: parameters.size,
        format: parameters.format,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the avatar image for a project, issue type or priority. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - For system avatars, none.
   * - - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
   *       the project the avatar belongs to.
   * - - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg)
   *       for at least one project the issue type is used in.
   * - - For priority avatars, none.
   */
  async getAvatarImageByOwner(parameters: GetAvatarImageByOwnerParameters) {
    const request: Request = {
      url: `/rest/api/2/universal_avatar/view/type/${parameters.type}/owner/${parameters.entityId}`,
      method: 'GET',
      query: {
        size: parameters.size,
        format: parameters.format,
      },
    };

    return this.client.sendRequest(request);
  }
}
