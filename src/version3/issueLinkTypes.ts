import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueLinkTypes {
  constructor(private client: Client) {}

  /**
   * Returns a list of all issue link types.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
   */
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback?: never): Promise<T>;
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issueLinkType',
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.CreateIssueLinkType | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates an issue link type. Use this operation to create descriptions of the reasons why issues are linked. The
   * issue link type consists of a name and descriptions for a link's inward and outward relationships.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueLinkType<T = Models.IssueLinkType>(
    parameters?: Parameters.CreateIssueLinkType,
    callback?: never
  ): Promise<T>;
  async createIssueLinkType<T = Models.IssueLinkType>(
    parameters?: Parameters.CreateIssueLinkType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issueLinkType',
      method: 'POST',
      data: {
        id: parameters?.id,
        name: parameters?.name,
        inward: parameters?.inward,
        outward: parameters?.outward,
        self: parameters?.self,
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
   */
  async getIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.GetIssueLinkType,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
   */
  async getIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.GetIssueLinkType,
    callback?: never
  ): Promise<T>;
  async getIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.GetIssueLinkType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.UpdateIssueLinkType,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.UpdateIssueLinkType,
    callback?: never
  ): Promise<T>;
  async updateIssueLinkType<T = Models.IssueLinkType>(
    parameters: Parameters.UpdateIssueLinkType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'PUT',
      data: {
        id: parameters.id,
        name: parameters.name,
        inward: parameters.inward,
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueLinkType<T = void>(parameters: Parameters.DeleteIssueLinkType, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueLinkType<T = void>(parameters: Parameters.DeleteIssueLinkType, callback?: never): Promise<T>;
  async deleteIssueLinkType<T = void>(
    parameters: Parameters.DeleteIssueLinkType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
