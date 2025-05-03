import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueTypes {
  constructor(private client: Client) {}

  /**
   * Returns all issue types.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issue
   * types are only returned as follows:
   *
   * - If the user has the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), all issue
   *   types are returned.
   * - If the user has the _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or
   *   more projects, the issue types associated with the projects the user has permission to browse are returned.
   * - If the user is anonymous then they will be able to access projects with the _Browse projects_ for anonymous users
   * - If the user authentication is incorrect they will fall back to anonymous
   */
  async getIssueAllTypes<T = Models.IssueTypeDetails[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all issue types.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Issue
   * types are only returned as follows:
   *
   * - If the user has the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), all issue
   *   types are returned.
   * - If the user has the _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or
   *   more projects, the issue types associated with the projects the user has permission to browse are returned.
   * - If the user is anonymous then they will be able to access projects with the _Browse projects_ for anonymous users
   * - If the user authentication is incorrect they will fall back to anonymous
   */
  async getIssueAllTypes<T = Models.IssueTypeDetails[]>(callback?: never): Promise<T>;
  async getIssueAllTypes<T = Models.IssueTypeDetails[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuetype',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates an issue type and adds it to the default issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueType<T = Models.IssueTypeDetails>(
    parameters: Parameters.CreateIssueType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates an issue type and adds it to the default issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueType<T = Models.IssueTypeDetails>(
    parameters: Parameters.CreateIssueType,
    callback?: never,
  ): Promise<T>;
  async createIssueType<T = Models.IssueTypeDetails>(
    parameters: Parameters.CreateIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuetype',
      method: 'POST',
      data: {
        description: parameters.description,
        hierarchyLevel: parameters.hierarchyLevel,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns issue types for a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the relevant project or _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypesForProject<T = Models.IssueTypeDetails[]>(
    parameters: Parameters.GetIssueTypesForProject,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns issue types for a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) in the relevant project or _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypesForProject<T = Models.IssueTypeDetails[]>(
    parameters: Parameters.GetIssueTypesForProject,
    callback?: never,
  ): Promise<T>;
  async getIssueTypesForProject<T = Models.IssueTypeDetails[]>(
    parameters: Parameters.GetIssueTypesForProject,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuetype/project',
      method: 'GET',
      params: {
        projectId: parameters.projectId,
        level: parameters.level,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns an issue type.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) in a project the issue type is associated
   * with or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueType<T = Models.IssueTypeDetails>(
    parameters: Parameters.GetIssueType | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns an issue type.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) in a project the issue type is associated
   * with or _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueType<T = Models.IssueTypeDetails>(
    parameters: Parameters.GetIssueType | string,
    callback?: never,
  ): Promise<T>;
  async getIssueType<T = Models.IssueTypeDetails>(
    parameters: Parameters.GetIssueType | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the issue type.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueType<T = Models.IssueTypeDetails>(
    parameters: Parameters.UpdateIssueType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the issue type.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueType<T = Models.IssueTypeDetails>(
    parameters: Parameters.UpdateIssueType,
    callback?: never,
  ): Promise<T>;
  async updateIssueType<T = Models.IssueTypeDetails>(
    parameters: Parameters.UpdateIssueType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.id}`,
      method: 'PUT',
      data: {
        avatarId: parameters.avatarId,
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes the issue type. If the issue type is in use, all uses are updated with the alternative issue type
   * (`alternativeIssueTypeId`). A list of alternative issue types are obtained from the [Get alternative issue
   * types](#api-rest-api-2-issuetype-id-alternatives-get) resource.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueType<T = void>(
    parameters: Parameters.DeleteIssueType | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes the issue type. If the issue type is in use, all uses are updated with the alternative issue type
   * (`alternativeIssueTypeId`). A list of alternative issue types are obtained from the [Get alternative issue
   * types](#api-rest-api-2-issuetype-id-alternatives-get) resource.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueType<T = void>(parameters: Parameters.DeleteIssueType | string, callback?: never): Promise<T>;
  async deleteIssueType<T = void>(
    parameters: Parameters.DeleteIssueType | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${id}`,
      method: 'DELETE',
      params: {
        alternativeIssueTypeId: typeof parameters !== 'string' ? parameters.alternativeIssueTypeId : undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of issue types that can be used to replace the issue type. The alternative issue types are those
   * assigned to the same workflow scheme, field configuration scheme, and screen scheme.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAlternativeIssueTypes<T = Models.IssueTypeDetails[]>(
    parameters: Parameters.GetAlternativeIssueTypes | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of issue types that can be used to replace the issue type. The alternative issue types are those
   * assigned to the same workflow scheme, field configuration scheme, and screen scheme.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAlternativeIssueTypes<T = Models.IssueTypeDetails[]>(
    parameters: Parameters.GetAlternativeIssueTypes | string,
    callback?: never,
  ): Promise<T>;
  async getAlternativeIssueTypes<T = Models.IssueTypeDetails[]>(
    parameters: Parameters.GetAlternativeIssueTypes | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${id}/alternatives`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Loads an avatar for the issue type.
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   * the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar, use [ Update issue
   * type](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-types/#api-rest-api-2-issuetype-id-put)
   * to set it as the issue type's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueTypeAvatar<T = Models.Avatar>(
    parameters: Parameters.CreateIssueTypeAvatar,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Loads an avatar for the issue type.
   *
   * The avatar is cropped to a square. If no crop parameters are specified, the square originates at the top left of
   * the image. The length of the square's sides is set to the smaller of the height or width of the image.
   *
   * The cropped image is then used to create avatars of 16x16, 24x24, 32x32, and 48x48 in size.
   *
   * After creating the avatar, use [ Update issue
   * type](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-types/#api-rest-api-2-issuetype-id-put)
   * to set it as the issue type's displayed avatar.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueTypeAvatar<T = Models.Avatar>(
    parameters: Parameters.CreateIssueTypeAvatar,
    callback?: never,
  ): Promise<T>;
  async createIssueTypeAvatar<T = Models.Avatar>(
    parameters: Parameters.CreateIssueTypeAvatar,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuetype/${parameters.id}/avatar2`,
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
}
