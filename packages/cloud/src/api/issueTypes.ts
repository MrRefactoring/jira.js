import { IssueTypeDetailsSchema, type IssueTypeDetails } from '#/models/issueTypeDetails';
import { AvatarSchema, type Avatar } from '#/models/avatar';
import { type CreateIssueType } from '#/parameters/createIssueType';
import { type GetIssueType } from '#/parameters/getIssueType';
import { type UpdateIssueType } from '#/parameters/updateIssueType';
import { type DeleteIssueType } from '#/parameters/deleteIssueType';
import { type GetAlternativeIssueTypes } from '#/parameters/getAlternativeIssueTypes';
import { type CreateIssueTypeAvatar } from '#/parameters/createIssueTypeAvatar';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns all issue types.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Issue
 * types are only returned as follows:
 *
 * - If the user has the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), all issue types
 *   are returned.
 * - If the user has the _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more
 *   projects, the issue types associated with the projects the user has permission to browse are returned.
 * - If the user is anonymous then they will be able to access projects with the _Browse projects_ for anonymous users
 * - If the user authentication is incorrect they will fall back to anonymous
 */
export async function getIssueAllTypes(client: Client): Promise<IssueTypeDetails[]> {
  const config: SendRequestOptions<IssueTypeDetails[]> = {
    url: '/rest/api/3/issuetype',
    method: 'GET',
    schema: z.array(IssueTypeDetailsSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Creates an issue type.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createIssueType(client: Client, parameters: CreateIssueType): Promise<IssueTypeDetails> {
  const config: SendRequestOptions<IssueTypeDetails> = {
    url: '/rest/api/3/issuetype',
    method: 'POST',
    body: {
      description: parameters.description,
      hierarchyLevel: parameters.hierarchyLevel,
      name: parameters.name,
    },
    schema: IssueTypeDetailsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns an issue type.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) in a project the issue type is associated
 * with or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getIssueType(client: Client, parameters: GetIssueType): Promise<IssueTypeDetails> {
  const config: SendRequestOptions<IssueTypeDetails> = {
    url: `/rest/api/3/issuetype/${parameters.id}`,
    method: 'GET',
    schema: IssueTypeDetailsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the issue type.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function updateIssueType(client: Client, parameters: UpdateIssueType): Promise<IssueTypeDetails> {
  const config: SendRequestOptions<IssueTypeDetails> = {
    url: `/rest/api/3/issuetype/${parameters.id}`,
    method: 'PUT',
    body: {
      avatarId: parameters.avatarId,
      description: parameters.description,
      name: parameters.name,
    },
    schema: IssueTypeDetailsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the issue type. If the issue type is in use, all uses are updated with the alternative issue type
 * (`alternativeIssueTypeId`). A list of alternative issue types are obtained from the [Get alternative issue
 * types](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issuetype/#api-rest-api-3-issuetype-id-alternatives-get)
 * resource.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteIssueType(client: Client, parameters: DeleteIssueType): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/issuetype/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      alternativeIssueTypeId: parameters.alternativeIssueTypeId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of issue types that can be used to replace the issue type. The alternative issue types are those
 * assigned to the same workflow scheme, field configuration scheme, and screen scheme.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getAlternativeIssueTypes(
  client: Client,
  parameters: GetAlternativeIssueTypes,
): Promise<IssueTypeDetails[]> {
  const config: SendRequestOptions<IssueTypeDetails[]> = {
    url: `/rest/api/3/issuetype/${parameters.id}/alternatives`,
    method: 'GET',
    schema: z.array(IssueTypeDetailsSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Loads an avatar for the issue type.
 *
 * Specify the avatar's local file location in the body of the request. Also, include the following headers:
 *
 * - `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special
 *   Headers](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#special-request-headers).
 * - `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
 *
 * For example:\
 * `curl --request POST \ --user email@example.com:<api_token> \ --header 'X-Atlassian-Token: no-check' \ --header
 * 'Content-Type: image/< image_type>' \ --data-binary "<@/path/to/file/with/your/avatar>" \ --url
 * 'https://your-domain.atlassian.net/rest/api/3/issuetype/{issueTypeId}'This`
 *
 * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of the
 * image. The length of the square's sides is set to the smaller of the height or width of the image.
 *
 * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
 *
 * After creating the avatar, use [ Update issue
 * type](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issuetype/#api-rest-api-3-issuetype-id-put)
 * to set it as the issue type's displayed avatar.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function createIssueTypeAvatar(client: Client, parameters: CreateIssueTypeAvatar): Promise<Avatar> {
  const config: SendRequestOptions<Avatar> = {
    url: `/rest/api/3/issuetype/${parameters.id}/avatar2`,
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
