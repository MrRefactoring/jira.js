import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Avatars {
  constructor(private client: Client) {}

  /**
   * Returns a list of system avatar details by owner type, where the owner types are issue type, project, user or
   * priority.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAllSystemAvatars<T = Models.SystemAvatars>(
    parameters: Parameters.GetAllSystemAvatars,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of system avatar details by owner type, where the owner types are issue type, project, user or
   * priority.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAllSystemAvatars<T = Models.SystemAvatars>(
    parameters: Parameters.GetAllSystemAvatars,
    callback?: never,
  ): Promise<T>;
  async getAllSystemAvatars<T = Models.SystemAvatars>(
    parameters: Parameters.GetAllSystemAvatars,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/avatar/${parameters.type}/system`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns the system and custom avatars for a project, issue type or priority.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
   *   the project the avatar belongs to.
   * - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg)
   *   for at least one project the issue type is used in.
   * - For system avatars, none.
   * - For priority avatars, none.
   */
  async getAvatars<T = Models.Avatars>(parameters: Parameters.GetAvatars, callback: Callback<T>): Promise<void>;
  /**
   * Returns the system and custom avatars for a project, issue type or priority.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
   *   the project the avatar belongs to.
   * - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg)
   *   for at least one project the issue type is used in.
   * - For system avatars, none.
   * - For priority avatars, none.
   */
  async getAvatars<T = Models.Avatars>(parameters: Parameters.GetAvatars, callback?: never): Promise<T>;
  async getAvatars<T = Models.Avatars>(parameters: Parameters.GetAvatars, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
  /**
   * Loads a custom avatar for a project, issue type or priority.
   *
   * Specify the avatar's local file location in the body of the request. Also, include the following headers:
   *
   * - `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special
   *   Headers](#special-request-headers).
   * - `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
   *
   * For example:\
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
   * `--url 'https://your-domain.atlassian.net/rest/api/2/universal_avatar/type/{type}/owner/{entityId}'`
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   * the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar use:
   *
   * - [Update issue type](#api-rest-api-2-issuetype-id-put) to set it as the issue type's displayed avatar.
   * - [Set project avatar](#api-rest-api-2-project-projectIdOrKey-avatar-put) to set it as the project's displayed
   *   avatar.
   * - [Update priority](#api-rest-api-2-priority-id-put) to set it as the priority's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async storeAvatar<T = Models.Avatar>(parameters: Parameters.StoreAvatar, callback: Callback<T>): Promise<void>;
  /**
   * Loads a custom avatar for a project, issue type or priority.
   *
   * Specify the avatar's local file location in the body of the request. Also, include the following headers:
   *
   * - `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special
   *   Headers](#special-request-headers).
   * - `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
   *
   * For example:\
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
   * `--url 'https://your-domain.atlassian.net/rest/api/2/universal_avatar/type/{type}/owner/{entityId}'`
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   * the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar use:
   *
   * - [Update issue type](#api-rest-api-2-issuetype-id-put) to set it as the issue type's displayed avatar.
   * - [Set project avatar](#api-rest-api-2-project-projectIdOrKey-avatar-put) to set it as the project's displayed
   *   avatar.
   * - [Update priority](#api-rest-api-2-priority-id-put) to set it as the priority's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async storeAvatar<T = Models.Avatar>(parameters: Parameters.StoreAvatar, callback?: never): Promise<T>;
  async storeAvatar<T = Models.Avatar>(parameters: Parameters.StoreAvatar, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
      method: 'POST',
      params: {
        x: parameters.x,
        y: parameters.y,
        size: parameters.size,
      },
    };

    return this.client.sendRequest(config, callback);
  }
  /**
   * Deletes an avatar from a project, issue type or priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteAvatar<T = void>(parameters: Parameters.DeleteAvatar, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an avatar from a project, issue type or priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteAvatar<T = void>(parameters: Parameters.DeleteAvatar, callback?: never): Promise<T>;
  async deleteAvatar<T = void>(parameters: Parameters.DeleteAvatar, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}/avatar/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns the default project, issue type or priority avatar image.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAvatarImageByType<T = Models.StreamingResponseBody>(
    parameters: Parameters.GetAvatarImageByType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the default project, issue type or priority avatar image.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAvatarImageByType<T = Models.StreamingResponseBody>(
    parameters: Parameters.GetAvatarImageByType,
    callback?: never,
  ): Promise<T>;
  async getAvatarImageByType<T = Models.StreamingResponseBody>(
    parameters: Parameters.GetAvatarImageByType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/universal_avatar/view/type/${parameters.type}`,
      method: 'GET',
      params: {
        size: parameters.size,
        format: parameters.format,
      },
    };

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns a project, issue type or priority avatar image by ID.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - For system avatars, none.
   * - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
   *   the project the avatar belongs to.
   * - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg)
   *   for at least one project the issue type is used in.
   * - For priority avatars, none.
   */
  async getAvatarImageByID<T = Models.StreamingResponseBody>(
    parameters: Parameters.GetAvatarImageByID,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a project, issue type or priority avatar image by ID.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - For system avatars, none.
   * - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
   *   the project the avatar belongs to.
   * - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg)
   *   for at least one project the issue type is used in.
   * - For priority avatars, none.
   */
  async getAvatarImageByID<T = Models.StreamingResponseBody>(
    parameters: Parameters.GetAvatarImageByID,
    callback?: never,
  ): Promise<T>;
  async getAvatarImageByID<T = Models.StreamingResponseBody>(
    parameters: Parameters.GetAvatarImageByID,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/universal_avatar/view/type/${parameters.type}/avatar/${parameters.id}`,
      method: 'GET',
      params: {
        size: parameters.size,
        format: parameters.format,
      },
    };

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns the avatar image for a project, issue type or priority.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - For system avatars, none.
   * - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
   *   the project the avatar belongs to.
   * - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg)
   *   for at least one project the issue type is used in.
   * - For priority avatars, none.
   */
  async getAvatarImageByOwner<T = Models.StreamingResponseBody>(
    parameters: Parameters.GetAvatarImageByOwner,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the avatar image for a project, issue type or priority.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - For system avatars, none.
   * - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
   *   the project the avatar belongs to.
   * - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg)
   *   for at least one project the issue type is used in.
   * - For priority avatars, none.
   */
  async getAvatarImageByOwner<T = Models.StreamingResponseBody>(
    parameters: Parameters.GetAvatarImageByOwner,
    callback?: never,
  ): Promise<T>;
  async getAvatarImageByOwner<T = Models.StreamingResponseBody>(
    parameters: Parameters.GetAvatarImageByOwner,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/universal_avatar/view/type/${parameters.type}/owner/${parameters.entityId}`,
      method: 'GET',
      params: {
        size: parameters.size,
        format: parameters.format,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
