import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueTypes {
  constructor(private client: Client) {
  }

  /**
   * Returns all issue types.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issue types are only returned as follows:
   *
   *  *  if the user has the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), all issue types are returned.
   *  *  if the user has the *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, the issue types associated with the projects the user has permission to browse are returned. */
  async getIssueAllTypes<T = Models.IssueTypeDetails[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all issue types.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issue types are only returned as follows:
   *
   *  *  if the user has the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg), all issue types are returned.
   *  *  if the user has the *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, the issue types associated with the projects the user has permission to browse are returned. */
  async getIssueAllTypes<T = Models.IssueTypeDetails[]>(callback?: never): Promise<T>;
  async getIssueAllTypes<T = Models.IssueTypeDetails[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuetype',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueTypes.getIssueAllTypes' });
  }

  /**
   * Creates an issue type and adds it to the default issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.CreateIssueType | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Creates an issue type and adds it to the default issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createIssueType<T = Models.IssueTypeDetails>(parameters?: Parameters.CreateIssueType, callback?: never): Promise<T>;
  async createIssueType<T = Models.IssueTypeDetails>(parameters?: Parameters.CreateIssueType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuetype',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        type: parameters?.type,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueTypes.createIssueType' });
  }

  /**
   * Returns an issue type.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) in a project the issue type is associated with or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.GetIssueType, callback: Callback<T>): Promise<void>;
  /**
   * Returns an issue type.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) in a project the issue type is associated with or *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.GetIssueType, callback?: never): Promise<T>;
  async getIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.GetIssueType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueTypes.getIssueType' });
  }

  /**
   * Updates the issue type.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.UpdateIssueType, callback: Callback<T>): Promise<void>;
  /**
   * Updates the issue type.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.UpdateIssueType, callback?: never): Promise<T>;
  async updateIssueType<T = Models.IssueTypeDetails>(parameters: Parameters.UpdateIssueType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        avatarId: parameters.avatarId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueTypes.updateIssueType' });
  }

  /**
   * Deletes the issue type. If the issue type is in use, all uses are updated with the alternative issue type (`alternativeIssueTypeId`). A list of alternative issue types are obtained from the [Get alternative issue types](#api-rest-api-2-issuetype-id-alternatives-get) resource.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteIssueType<T = void>(parameters: Parameters.DeleteIssueType, callback: Callback<T>): Promise<void>;
  /**
   * Deletes the issue type. If the issue type is in use, all uses are updated with the alternative issue type (`alternativeIssueTypeId`). A list of alternative issue types are obtained from the [Get alternative issue types](#api-rest-api-2-issuetype-id-alternatives-get) resource.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteIssueType<T = void>(parameters: Parameters.DeleteIssueType, callback?: never): Promise<T>;
  async deleteIssueType<T = void>(parameters: Parameters.DeleteIssueType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.id}`,
      method: 'DELETE',
      params: {
        alternativeIssueTypeId: parameters.alternativeIssueTypeId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueTypes.deleteIssueType' });
  }

  /**
   * Returns a list of issue types that can be used to replace the issue type. The alternative issue types are those assigned to the same workflow scheme, field configuration scheme, and screen scheme.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async getAlternativeIssueTypes<T = Models.IssueTypeDetails[]>(parameters: Parameters.GetAlternativeIssueTypes, callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of issue types that can be used to replace the issue type. The alternative issue types are those assigned to the same workflow scheme, field configuration scheme, and screen scheme.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async getAlternativeIssueTypes<T = Models.IssueTypeDetails[]>(parameters: Parameters.GetAlternativeIssueTypes, callback?: never): Promise<T>;
  async getAlternativeIssueTypes<T = Models.IssueTypeDetails[]>(parameters: Parameters.GetAlternativeIssueTypes, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.id}/alternatives`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueTypes.getAlternativeIssueTypes' });
  }

  /**
   * Loads an avatar for the issue type.
   *
   * Specify the avatar's local file location in the body of the request. Also, include the following headers:
   *
   *  *  `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special Headers](#special-request-headers).
   *  *  `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
   *
   * For example:
   * `curl --request POST \ --user email@example.com:<api_token> \ --header 'X-Atlassian-Token: no-check' \ --header 'Content-Type: image/< image_type>' \ --data-binary "<@/path/to/file/with/your/avatar>" \ --url 'https://your-domain.atlassian.net/rest/api/2/issuetype/{issueTypeId}'This`
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar, use [ Update issue type](#api-rest-api-2-issuetype-id-put) to set it as the issue type's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createIssueTypeAvatar<T = Models.Avatar>(parameters: Parameters.CreateIssueTypeAvatar, callback: Callback<T>): Promise<void>;
  /**
   * Loads an avatar for the issue type.
   *
   * Specify the avatar's local file location in the body of the request. Also, include the following headers:
   *
   *  *  `X-Atlassian-Token: no-check` To prevent XSRF protection blocking the request, for more information see [Special Headers](#special-request-headers).
   *  *  `Content-Type: image/image type` Valid image types are JPEG, GIF, or PNG.
   *
   * For example:
   * `curl --request POST \ --user email@example.com:<api_token> \ --header 'X-Atlassian-Token: no-check' \ --header 'Content-Type: image/< image_type>' \ --data-binary "<@/path/to/file/with/your/avatar>" \ --url 'https://your-domain.atlassian.net/rest/api/2/issuetype/{issueTypeId}'This`
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar, use [ Update issue type](#api-rest-api-2-issuetype-id-put) to set it as the issue type's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createIssueTypeAvatar<T = Models.Avatar>(parameters: Parameters.CreateIssueTypeAvatar, callback?: never): Promise<T>;
  async createIssueTypeAvatar<T = Models.Avatar>(parameters: Parameters.CreateIssueTypeAvatar, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.id}/avatar2`,
      method: 'POST',
      params: {
        x: parameters.x,
        y: parameters.y,
        size: parameters.size,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueTypes.createIssueTypeAvatar' });
  }
}
