import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueLinkTypes {
  constructor(private client: Client) {}

  /**
   * Returns a list of all issue link types.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
   */
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of all issue link types.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
   */
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback?: never): Promise<T>;
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issueLinkType',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates an issue link type. Use this operation to create descriptions of the reasons why issues are linked. The
   * issue link type consists of a name and descriptions for a link's inward and outward relationships.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.CreateIssueLinkType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates an issue link type. Use this operation to create descriptions of the reasons why issues are linked. The
   * issue link type consists of a name and descriptions for a link's inward and outward relationships.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.CreateIssueLinkType,
    callback?: never,
  ): Promise<T>;
  async createIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.CreateIssueLinkType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issueLinkType',
      method: 'POST',
      data: {
        id: parameters.id,
        inward: parameters.inward,
        name: parameters.name,
        outward: parameters.outward,
        self: parameters.self,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
   */
  async getIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.GetIssueLinkType | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
   */
  async getIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.GetIssueLinkType | string,
    callback?: never,
  ): Promise<T>;
  async getIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.GetIssueLinkType | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const issueLinkTypeId = typeof parameters === 'string' ? parameters : parameters.issueLinkTypeId;

    const config: RequestConfig = {
      url: `/rest/api/2/issueLinkType/${issueLinkTypeId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.UpdateIssueLinkType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.UpdateIssueLinkType,
    callback?: never,
  ): Promise<T>;
  async updateIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.UpdateIssueLinkType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'PUT',
      data: {
        id: parameters.id,
        inward: parameters.inward,
        name: parameters.name,
        outward: parameters.outward,
        self: parameters.self,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueLinkType<T = void>(
    parameters: Parameters.DeleteIssueLinkType | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueLinkType<T = void>(
    parameters: Parameters.DeleteIssueLinkType | string,
    callback?: never,
  ): Promise<T>;
  async deleteIssueLinkType<T = void>(
    parameters: Parameters.DeleteIssueLinkType | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const issueLinkTypeId = typeof parameters === 'string' ? parameters : parameters.issueLinkTypeId;

    const config: RequestConfig = {
      url: `/rest/api/2/issueLinkType/${issueLinkTypeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
