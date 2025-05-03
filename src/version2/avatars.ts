import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

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
    parameters: Parameters.GetAllSystemAvatars | string,
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
    parameters: Parameters.GetAllSystemAvatars | string,
    callback?: never,
  ): Promise<T>;
  async getAllSystemAvatars<T = Models.SystemAvatars>(
    parameters: Parameters.GetAllSystemAvatars | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const type = typeof parameters === 'string' ? parameters : parameters.type;

    const config: RequestConfig = {
      url: `/rest/api/2/avatar/${type}/system`,
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
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   * the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar use:
   *
   * - [Update issue
   *   type](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-types/#api-rest-api-2-issuetype-id-put)
   *   to set it as the issue type's displayed avatar.
   * - [Set project
   *   avatar](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-avatars/#api-rest-api-2-project-projectidorkey-avatar-put)
   *   to set it as the project's displayed avatar.
   * - [Update
   *   priority](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-priorities/#api-rest-api-2-priority-id-put)
   *   to set it as the priority's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async storeAvatar<T = Models.Avatar>(parameters: Parameters.StoreAvatar, callback: Callback<T>): Promise<void>;
  /**
   * Loads a custom avatar for a project, issue type or priority.
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   * the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar use:
   *
   * - [Update issue
   *   type](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-types/#api-rest-api-2-issuetype-id-put)
   *   to set it as the issue type's displayed avatar.
   * - [Set project
   *   avatar](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-avatars/#api-rest-api-2-project-projectidorkey-avatar-put)
   *   to set it as the project's displayed avatar.
   * - [Update
   *   priority](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-priorities/#api-rest-api-2-priority-id-put)
   *   to set it as the priority's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async storeAvatar<T = Models.Avatar>(parameters: Parameters.StoreAvatar, callback?: never): Promise<T>;
  async storeAvatar<T = Models.Avatar>(parameters: Parameters.StoreAvatar, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
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
  async getAvatarImageByType<T = Models.AvatarWithDetails>(
    parameters: Parameters.GetAvatarImageByType | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the default project, issue type or priority avatar image.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAvatarImageByType<T = Models.AvatarWithDetails>(
    parameters: Parameters.GetAvatarImageByType | string,
    callback?: never,
  ): Promise<T>;
  async getAvatarImageByType<T = Models.AvatarWithDetails>(
    parameters: Parameters.GetAvatarImageByType | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const type = typeof parameters === 'string' ? parameters : parameters.type;

    const config: RequestConfig = {
      url: `/rest/api/2/universal_avatar/view/type/${type}`,
      method: 'GET',
      responseType: 'arraybuffer',
      params: {
        size: typeof parameters !== 'string' ? parameters.size : undefined,
        format: typeof parameters !== 'string' ? parameters.format : undefined,
      },
    };

    const {
      data: avatar,
      headers: { 'content-type': contentTypeWithEncoding },
    } = await this.client.sendRequestFullResponse<T>(config);

    const contentType = contentTypeWithEncoding.split(';')[0].trim();

    return this.client.handleSuccessResponse({ contentType, avatar }, callback);
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
  async getAvatarImageByID<T = Models.AvatarWithDetails>(
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
  async getAvatarImageByID<T = Models.AvatarWithDetails>(
    parameters: Parameters.GetAvatarImageByID,
    callback?: never,
  ): Promise<T>;
  async getAvatarImageByID<T = Models.AvatarWithDetails>(
    parameters: Parameters.GetAvatarImageByID,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/universal_avatar/view/type/${parameters.type}/avatar/${parameters.id}`,
      method: 'GET',
      responseType: 'arraybuffer',
      params: {
        size: parameters.size,
        format: parameters.format,
      },
    };

    const {
      data: avatar,
      headers: { 'content-type': contentTypeWithEncoding },
    } = await this.client.sendRequestFullResponse<T>(config);

    const contentType = contentTypeWithEncoding.split(';')[0].trim();

    return this.client.handleSuccessResponse({ contentType, avatar }, callback);
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
  async getAvatarImageByOwner<T = Models.AvatarWithDetails>(
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
  async getAvatarImageByOwner<T = Models.AvatarWithDetails>(
    parameters: Parameters.GetAvatarImageByOwner,
    callback?: never,
  ): Promise<T>;
  async getAvatarImageByOwner<T = Models.AvatarWithDetails>(
    parameters: Parameters.GetAvatarImageByOwner,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/universal_avatar/view/type/${parameters.type}/owner/${parameters.entityId}`,
      method: 'GET',
      responseType: 'arraybuffer',
      params: {
        size: parameters.size,
        format: parameters.format,
      },
    };

    const {
      data: avatar,
      headers: { 'content-type': contentTypeWithEncoding },
    } = await this.client.sendRequestFullResponse<T>(config);

    const contentType = contentTypeWithEncoding.split(';')[0].trim();

    return this.client.handleSuccessResponse({ contentType, avatar }, callback);
  }
}
