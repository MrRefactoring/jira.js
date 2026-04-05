import { SystemAvatarsSchema, type SystemAvatars } from '#/models/systemAvatars';
import { AvatarsSchema, type Avatars } from '#/models/avatars';
import { AvatarSchema, type Avatar } from '#/models/avatar';
import { StreamingResponseBodySchema, type StreamingResponseBody } from '#/models/streamingResponseBody';
import { type GetAllSystemAvatars } from '#/parameters/getAllSystemAvatars';
import { type GetAvatars } from '#/parameters/getAvatars';
import { type StoreAvatar } from '#/parameters/storeAvatar';
import { type DeleteAvatar } from '#/parameters/deleteAvatar';
import { type GetAvatarImageByType } from '#/parameters/getAvatarImageByType';
import { type GetAvatarImageByID } from '#/parameters/getAvatarImageByID';
import { type GetAvatarImageByOwner } from '#/parameters/getAvatarImageByOwner';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a list of system avatar details by owner type, where the owner types are issue type, project, user or
 * priority.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getAllSystemAvatars(client: Client, parameters: GetAllSystemAvatars): Promise<SystemAvatars> {
  const config: SendRequestOptions<SystemAvatars> = {
    url: `/rest/api/3/avatar/${parameters.type}/system`,
    method: 'GET',
    schema: SystemAvatarsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the system and custom avatars for a project, issue type or priority.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
 *   project the avatar belongs to.
 * - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
 *   at least one project the issue type is used in.
 * - For system avatars, none.
 * - For priority avatars, none.
 */
export async function getAvatars(client: Client, parameters: GetAvatars): Promise<Avatars> {
  const config: SendRequestOptions<Avatars> = {
    url: `/rest/api/3/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
    method: 'GET',
    schema: AvatarsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Loads a custom avatar for a project, issue type or priority.
 *
 * Specify the avatar's local file location in the body of the request. Also, include the following headers:
 *
 * - `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special
 *   Headers](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#special-request-headers).
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
 * `--url 'https://your-domain.atlassian.net/rest/api/3/universal_avatar/type/{type}/owner/{entityId}'`
 *
 * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of the
 * image. The length of the square's sides is set to the smaller of the height or width of the image.
 *
 * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
 *
 * After creating the avatar use:
 *
 * - [Update issue
 *   type](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issuetype/#api-rest-api-3-issuetype-id-put)
 *   to set it as the issue type's displayed avatar.
 * - [Set project
 *   avatar](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project/#api-rest-api-3-project-projectIdOrKey-avatar-put)
 *   to set it as the project's displayed avatar.
 * - [Update
 *   priority](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-priority/#api-rest-api-3-priority-id-put)
 *   to set it as the priority's displayed avatar.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function storeAvatar(client: Client, parameters: StoreAvatar): Promise<Avatar> {
  const config: SendRequestOptions<Avatar> = {
    url: `/rest/api/3/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
    method: 'POST',
    searchParams: {
      x: parameters.x,
      y: parameters.y,
      size: parameters.size,
    },
    body: parameters.body,
    schema: AvatarSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an avatar from a project, issue type or priority.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteAvatar(client: Client, parameters: DeleteAvatar): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}/avatar/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the default project, issue type or priority avatar image.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getAvatarImageByType(
  client: Client,
  parameters: GetAvatarImageByType,
): Promise<StreamingResponseBody> {
  const config: SendRequestOptions<StreamingResponseBody> = {
    url: `/rest/api/3/universal_avatar/view/type/${parameters.type}`,
    method: 'GET',
    searchParams: {
      size: parameters.size,
      format: parameters.format,
    },
    schema: StreamingResponseBodySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a project, issue type or priority avatar image by ID.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - For system avatars, none.
 * - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
 *   project the avatar belongs to.
 * - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
 *   at least one project the issue type is used in.
 * - For priority avatars, none.
 */
export async function getAvatarImageByID(
  client: Client,
  parameters: GetAvatarImageByID,
): Promise<StreamingResponseBody> {
  const config: SendRequestOptions<StreamingResponseBody> = {
    url: `/rest/api/3/universal_avatar/view/type/${parameters.type}/avatar/${parameters.id}`,
    method: 'GET',
    searchParams: {
      size: parameters.size,
      format: parameters.format,
    },
    schema: StreamingResponseBodySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the avatar image for a project, issue type or priority.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - For system avatars, none.
 * - For custom project avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the
 *   project the avatar belongs to.
 * - For custom issue type avatars, _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for
 *   at least one project the issue type is used in.
 * - For priority avatars, none.
 */
export async function getAvatarImageByOwner(
  client: Client,
  parameters: GetAvatarImageByOwner,
): Promise<StreamingResponseBody> {
  const config: SendRequestOptions<StreamingResponseBody> = {
    url: `/rest/api/3/universal_avatar/view/type/${parameters.type}/owner/${parameters.entityId}`,
    method: 'GET',
    searchParams: {
      size: parameters.size,
      format: parameters.format,
    },
    schema: StreamingResponseBodySchema,
  };

  return await client.sendRequest(config);
}
