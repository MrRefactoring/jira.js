import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class ProjectProperties {
  constructor(private client: Client) {}

  /**
   * Returns all [project
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
   * keys for the project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetProjectPropertyKeys | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns all [project
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
   * keys for the project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetProjectPropertyKeys | string,
    callback?: never
  ): Promise<T>;
  async getProjectPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetProjectPropertyKeys | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/2/project/${projectIdOrKey}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the value of a [project
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the property.
   */
  async getProjectProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetProjectProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the value of a [project
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the property.
   */
  async getProjectProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetProjectProperty,
    callback?: never
  ): Promise<T>;
  async getProjectProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetProjectProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the value of the [project
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   * You can use project properties to store custom data against the project.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the property is created.
   */
  async setProjectProperty<T = unknown>(
    parameters: Parameters.SetProjectProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets the value of the [project
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   * You can use project properties to store custom data against the project.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the property is created.
   */
  async setProjectProperty<T = unknown>(parameters: Parameters.SetProjectProperty, callback?: never): Promise<T>;
  async setProjectProperty<T = unknown>(
    parameters: Parameters.SetProjectProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'PUT',
      data: parameters.property,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes the
   * [property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
   * from a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the property.
   */
  async deleteProjectProperty<T = void>(
    parameters: Parameters.DeleteProjectProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes the
   * [property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
   * from a project.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the property.
   */
  async deleteProjectProperty<T = void>(parameters: Parameters.DeleteProjectProperty, callback?: never): Promise<T>;
  async deleteProjectProperty<T = void>(
    parameters: Parameters.DeleteProjectProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
