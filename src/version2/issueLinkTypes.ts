import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueLinkTypes {
  constructor(private client: Client) {
  }

  /**
   * Returns a list of all issue link types.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site. */
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of all issue link types.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site. */
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback?: never): Promise<T>;
  async getIssueLinkTypes<T = Models.IssueLinkTypes>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issueLinkType',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueLinkTypes.getIssueLinkTypes' });
  }

  /**
   * Creates an issue link type. Use this operation to create descriptions of the reasons why issues are linked. The issue link type consists of a name and descriptions for a link's inward and outward relationships.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.CreateIssueLinkType | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Creates an issue link type. Use this operation to create descriptions of the reasons why issues are linked. The issue link type consists of a name and descriptions for a link's inward and outward relationships.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createIssueLinkType<T = Models.IssueLinkType>(parameters?: Parameters.CreateIssueLinkType, callback?: never): Promise<T>;
  async createIssueLinkType<T = Models.IssueLinkType>(parameters?: Parameters.CreateIssueLinkType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issueLinkType',
      method: 'POST',
      data: {
        id: parameters?.id,
        name: parameters?.name,
        inward: parameters?.inward,
        outward: parameters?.outward,
        self: parameters?.self,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueLinkTypes.createIssueLinkType' });
  }

  /**
   * Returns an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site. */
  async getIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.GetIssueLinkType, callback: Callback<T>): Promise<void>;
  /**
   * Returns an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site. */
  async getIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.GetIssueLinkType, callback?: never): Promise<T>;
  async getIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.GetIssueLinkType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueLinkTypes.getIssueLinkType' });
  }

  /**
   * Updates an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.UpdateIssueLinkType, callback: Callback<T>): Promise<void>;
  /**
   * Updates an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.UpdateIssueLinkType, callback?: never): Promise<T>;
  async updateIssueLinkType<T = Models.IssueLinkType>(parameters: Parameters.UpdateIssueLinkType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'PUT',
      data: {
        id: parameters.id,
        name: parameters.name,
        inward: parameters.inward,
        outward: parameters.outward,
        self: parameters.self,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueLinkTypes.updateIssueLinkType' });
  }

  /**
   * Deletes an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteIssueLinkType<T = void>(parameters: Parameters.DeleteIssueLinkType, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an issue link type.
   *
   * To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteIssueLinkType<T = void>(parameters: Parameters.DeleteIssueLinkType, callback?: never): Promise<T>;
  async deleteIssueLinkType<T = void>(parameters: Parameters.DeleteIssueLinkType, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.issueLinkTypes.deleteIssueLinkType' });
  }
}
