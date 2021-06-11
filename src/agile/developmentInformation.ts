import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class DevelopmentInformation {
  constructor(private client: Client) {}

  /**
   * Stores development information provided in the request to make it available when viewing issues in Jira. Existing
   * repository and entity data for the same ID will be replaced if the updateSequenceId of existing data is less than
   * the incoming data. Submissions are performed asynchronously. Submitted data will eventually be available in Jira;
   * most updates are available within a short period of time, but may take some time during peak load and/or maintenance times.
   */
  async storeDevelopmentInformation<T = Models.StoreDevelopmentInformation>(
    parameters: Parameters.StoreDevelopmentInformation,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Stores development information provided in the request to make it available when viewing issues in Jira. Existing
   * repository and entity data for the same ID will be replaced if the updateSequenceId of existing data is less than
   * the incoming data. Submissions are performed asynchronously. Submitted data will eventually be available in Jira;
   * most updates are available within a short period of time, but may take some time during peak load and/or maintenance times.
   */
  async storeDevelopmentInformation<T = Models.StoreDevelopmentInformation>(
    parameters: Parameters.StoreDevelopmentInformation,
    callback?: never
  ): Promise<T>;
  async storeDevelopmentInformation<T = Models.StoreDevelopmentInformation>(
    parameters: Parameters.StoreDevelopmentInformation,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/devinfo/0.10/bulk',
      method: 'POST',
      data: {
        repositories: parameters.repositories,
        preventTransitions: parameters.preventTransitions,
        properties: parameters.properties,
        providerMetadata: parameters.providerMetadata,
      },
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'agile.developmentInformation.storeDevelopmentInformation',
    });
  }

  /**
   * For the specified repository ID, retrieves the repository and the most recent 400 development information entities.
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   */
  async getRepository<T = Models.GetRepository>(
    parameters: Parameters.GetRepository,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * For the specified repository ID, retrieves the repository and the most recent 400 development information entities.
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   */
  async getRepository<T = Models.GetRepository>(parameters: Parameters.GetRepository, callback?: never): Promise<T>;
  async getRepository<T = Models.GetRepository>(
    parameters: Parameters.GetRepository,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/devinfo/0.10/repository/${parameters.repositoryId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.developmentInformation.getRepository' });
  }

  /**
   * Deletes the repository data stored by the given ID and all related development information entities. Deletion is
   * performed asynchronously.
   */
  async deleteRepository<T = unknown>(parameters: Parameters.DeleteRepository, callback: Callback<T>): Promise<void>;
  /**
   * Deletes the repository data stored by the given ID and all related development information entities. Deletion is
   * performed asynchronously.
   */
  async deleteRepository<T = unknown>(parameters: Parameters.DeleteRepository, callback?: never): Promise<T>;
  async deleteRepository<T = unknown>(
    parameters: Parameters.DeleteRepository,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/devinfo/0.10/repository/${parameters.repositoryId}`,
      method: 'DELETE',
      params: {
        _updateSequenceId: parameters._updateSequenceId || parameters.updateSequenceId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.developmentInformation.deleteRepository' });
  }

  /**
   * Deletes development information entities which have all the provided properties. Entities will be deleted that
   * match ALL of the properties (i.e. treated as an AND). For example if request is `DELETE
   * bulk?accountId=123&projectId=ABC` entities which have properties `accountId=123` and `projectId=ABC` will be
   * deleted. Special property `_updateSequenceId` can be used to delete all entities with updateSequenceId less or
   * equal than the value specified. In addition to the optional `_updateSequenceId`, one or more query params must be
   * supplied to specify properties to delete by. Deletion is performed asynchronously: specified entities will
   * eventually be removed from Jira.
   */
  async deleteByProperties<T = unknown>(
    parameters: Parameters.DeleteByProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes development information entities which have all the provided properties. Entities will be deleted that
   * match ALL of the properties (i.e. treated as an AND). For example if request is `DELETE
   * bulk?accountId=123&projectId=ABC` entities which have properties `accountId=123` and `projectId=ABC` will be
   * deleted. Special property `_updateSequenceId` can be used to delete all entities with updateSequenceId less or
   * equal than the value specified. In addition to the optional `_updateSequenceId`, one or more query params must be
   * supplied to specify properties to delete by. Deletion is performed asynchronously: specified entities will
   * eventually be removed from Jira.
   */
  async deleteByProperties<T = unknown>(parameters: Parameters.DeleteByProperties, callback?: never): Promise<T>;
  async deleteByProperties<T = unknown>(
    parameters: Parameters.DeleteByProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/devinfo/0.10/bulkByProperties',
      method: 'DELETE',
      params: {
        _updateSequenceId: parameters._updateSequenceId || parameters.updateSequenceId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.developmentInformation.deleteByProperties' });
  }

  /**
   * Checks if development information which have all the provided properties exists. For example, if request is `GET
   * existsByProperties?accountId=123&projectId=ABC` then result will be positive only if there is at least one entity
   * or repository with both properties `accountId=123` and `projectId=ABC`. Special property `_updateSequenceId` can be
   * used to filter all entities with updateSequenceId less or equal than the value specified. In addition to the
   * optional `_updateSequenceId`, one or more query params must be supplied to specify properties to search by.
   */
  async existsByProperties<T = Models.ExistsByProperties>(
    parameters: Parameters.ExistsByProperties,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Checks if development information which have all the provided properties exists. For example, if request is `GET
   * existsByProperties?accountId=123&projectId=ABC` then result will be positive only if there is at least one entity
   * or repository with both properties `accountId=123` and `projectId=ABC`. Special property `_updateSequenceId` can be
   * used to filter all entities with updateSequenceId less or equal than the value specified. In addition to the
   * optional `_updateSequenceId`, one or more query params must be supplied to specify properties to search by.
   */
  async existsByProperties<T = Models.ExistsByProperties>(
    parameters: Parameters.ExistsByProperties,
    callback?: never
  ): Promise<T>;
  async existsByProperties<T = Models.ExistsByProperties>(
    parameters: Parameters.ExistsByProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/devinfo/0.10/existsByProperties',
      method: 'GET',
      params: {
        _updateSequenceId: parameters._updateSequenceId || parameters.updateSequenceId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.developmentInformation.existsByProperties' });
  }

  /** Deletes particular development information entity. Deletion is performed asynchronously. */
  async deleteEntity<T = unknown>(parameters: Parameters.DeleteEntity, callback: Callback<T>): Promise<void>;
  /** Deletes particular development information entity. Deletion is performed asynchronously. */
  async deleteEntity<T = unknown>(parameters: Parameters.DeleteEntity, callback?: never): Promise<T>;
  async deleteEntity<T = unknown>(parameters: Parameters.DeleteEntity, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/devinfo/0.10/repository/${parameters.repositoryId}/${parameters.entityType}/${parameters.entityId}`,
      method: 'DELETE',
      params: {
        _updateSequenceId: parameters._updateSequenceId || parameters.updateSequenceId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.developmentInformation.deleteEntity' });
  }
}
