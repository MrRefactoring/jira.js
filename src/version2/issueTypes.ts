import type { Client } from '../client';
import type { Request } from '../request';
import type { CreateIssueTypeParameters } from './parameters/createIssueTypeParameters';
import type { GetIssueTypesForProjectParameters } from './parameters/getIssueTypesForProjectParameters';
import type { DeleteIssueTypeParameters } from './parameters/deleteIssueTypeParameters';
import type { GetIssueTypeParameters } from './parameters/getIssueTypeParameters';
import type { UpdateIssueTypeParameters } from './parameters/updateIssueTypeParameters';
import type { GetAlternativeIssueTypesParameters } from './parameters/getAlternativeIssueTypesParameters';
import type { CreateIssueTypeAvatarParameters } from './parameters/createIssueTypeAvatarParameters';

export class IssueTypes {
  constructor(private client: Client) {}
  /**
   * Returns all issue types. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issue
   *   types are only returned as follows:
   * -
   * - - If the user has the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), all issue
   *       types are returned.
   * - - If the user has the _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or
   *       more projects, the issue types associated with the projects the user has permission to browse are returned.
   * - - If the user is anonymous then they will be able to access projects with the _Browse projects_ for anonymous users
   * - - If the user authentication is incorrect they will fall back to anonymous
   */
  async getIssueAllTypes() {
    const request: Request = {
      url: '/rest/api/2/issuetype',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates an issue type and adds it to the default issue type scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueType(parameters: CreateIssueTypeParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetype',
      method: 'POST',
      body: {
        description: parameters.description,
        hierarchyLevel: parameters.hierarchyLevel,
        name: parameters.name,
        type: parameters.type,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns issue types for a project. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the relevant project or _Administer
   *   Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypesForProject(parameters: GetIssueTypesForProjectParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetype/project',
      method: 'GET',
      query: {
        projectId: parameters.projectId,
        level: parameters.level,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes the issue type. If the issue type is in use, all uses are updated with the alternative issue type
   * (`alternativeIssueTypeId`). A list of alternative issue types are obtained from the [Get alternative issue
   * types](#api-rest-api-2-issuetype-id-alternatives-get) resource. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueType(parameters: DeleteIssueTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetype/${parameters.id}`,
      method: 'DELETE',
      query: {
        alternativeIssueTypeId: parameters.alternativeIssueTypeId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns an issue type. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) in a project the issue type is
   *   associated with or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueType(parameters: GetIssueTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetype/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the issue type. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueType(parameters: UpdateIssueTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetype/${parameters.id}`,
      method: 'PUT',
      body: {
        avatarId: parameters.avatarId,
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of issue types that can be used to replace the issue type. The alternative issue types are those
   * assigned to the same workflow scheme, field configuration scheme, and screen scheme. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAlternativeIssueTypes(parameters: GetAlternativeIssueTypesParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetype/${parameters.id}/alternatives`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Loads an avatar for the issue type. *
   *
   * - Specify the avatar's local file location in the body of the request. Also, include the following headers:
   * -
   * - - `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special
   *       Headers](#special-request-headers).
   * - - `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
   * -
   * - For example:
   * - `curl --request POST \ --user email@example.com:<api_token> \ --header 'X-Atlassian-Token: no-check' \ --header
   *   'Content-Type: image/< image_type>' \ --data-binary "<@/path/to/file/with/your/avatar>" \ --url
   *   'https://your-domain.atlassian.net/rest/api/2/issuetype/{issueTypeId}'This`
   * -
   * - The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   *   the image. The length of the square's sides is set to the smaller of the height or width of the image.
   * -
   * - The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   * -
   * - After creating the avatar, use [ Update issue
   *   type](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-types/#api-rest-api-2-issuetype-id-put)
   *   to set it as the issue type's displayed avatar.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueTypeAvatar(parameters: CreateIssueTypeAvatarParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetype/${parameters.id}/avatar2`,
      method: 'POST',
      query: {
        x: parameters.x,
        y: parameters.y,
        size: parameters.size,
      },
    };

    return this.client.sendRequest(request);
  }
}
