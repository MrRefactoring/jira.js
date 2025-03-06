import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class Organization {
  constructor(private client: Client) {}

  /**
   * This method returns a list of organizations in the Jira Service Management instance. Use this method when you want
   * to present a list of organizations or want to locate an organization by name.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any.
   * However, to fetch organizations based on `accountId` the user must have a Service Desk agent license.
   *
   * **Response limitations**: If the user is a customer, only those organizations of which the customer is a member are
   * listed.
   */
  async getOrganizations<T = Models.PagedOrganization>(
    parameters: Parameters.GetOrganizations | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns a list of organizations in the Jira Service Management instance. Use this method when you want
   * to present a list of organizations or want to locate an organization by name.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any.
   * However, to fetch organizations based on `accountId` the user must have a Service Desk agent license.
   *
   * **Response limitations**: If the user is a customer, only those organizations of which the customer is a member are
   * listed.
   */
  async getOrganizations<T = Models.PagedOrganization>(
    parameters?: Parameters.GetOrganizations,
    callback?: never,
  ): Promise<T>;
  async getOrganizations<T = Models.PagedOrganization>(
    parameters?: Parameters.GetOrganizations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/servicedeskapi/organization',
      method: 'GET',
      params: {
        start: parameters?.start,
        limit: parameters?.limit,
        accountId: parameters?.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method creates an organization by passing the name of the organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator or agent. Note: Permission to create organizations can be switched to users with the
   * Jira administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  async createOrganization<T = Models.Organization>(
    parameters: Parameters.CreateOrganization | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method creates an organization by passing the name of the organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator or agent. Note: Permission to create organizations can be switched to users with the
   * Jira administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  async createOrganization<T = Models.Organization>(
    parameters?: Parameters.CreateOrganization,
    callback?: never,
  ): Promise<T>;
  async createOrganization<T = Models.Organization>(
    parameters?: Parameters.CreateOrganization,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/servicedeskapi/organization',
      method: 'POST',
      data: {
        name: parameters?.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns details of an organization. Use this method to get organization details whenever your
   * application component is passed an organization ID but needs to display other organization details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   *
   * **Response limitations**: Customers can only retrieve organization of which they are members.
   */
  async getOrganization<T = Models.Organization>(
    parameters: Parameters.GetOrganization,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns details of an organization. Use this method to get organization details whenever your
   * application component is passed an organization ID but needs to display other organization details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   *
   * **Response limitations**: Customers can only retrieve organization of which they are members.
   */
  async getOrganization<T = Models.Organization>(parameters: Parameters.GetOrganization, callback?: never): Promise<T>;
  async getOrganization<T = Models.Organization>(
    parameters: Parameters.GetOrganization,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/organization/${parameters.organizationId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method deletes an organization. Note that the organization is deleted regardless of other associations it may
   * have. For example, associations with service desks.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Jira
   * administrator.
   */
  async deleteOrganization<T = void>(parameters: Parameters.DeleteOrganization, callback: Callback<T>): Promise<void>;
  /**
   * This method deletes an organization. Note that the organization is deleted regardless of other associations it may
   * have. For example, associations with service desks.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Jira
   * administrator.
   */
  async deleteOrganization<T = void>(parameters: Parameters.DeleteOrganization, callback?: never): Promise<T>;
  async deleteOrganization<T = void>(
    parameters: Parameters.DeleteOrganization,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/organization/${parameters.organizationId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the keys of all properties for an organization. Use this resource when you need to find out what additional
   * properties items have been added to an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   *
   * **Response limitations**: Customers can only access properties of organizations of which they are members.
   */
  async getPropertiesKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetOrganizationPropertyKeys,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the keys of all properties for an organization. Use this resource when you need to find out what additional
   * properties items have been added to an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   *
   * **Response limitations**: Customers can only access properties of organizations of which they are members.
   */
  async getPropertiesKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetOrganizationPropertyKeys,
    callback?: never,
  ): Promise<T>;
  async getPropertiesKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetOrganizationPropertyKeys,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/organization/${parameters.organizationId}/property`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the value of a property from an organization. Use this method to obtain the JSON content for an
   * organization's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   *
   * **Response limitations**: Customers can only access properties of organizations of which they are members.
   */
  async getProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetOrganizationProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the value of a property from an organization. Use this method to obtain the JSON content for an
   * organization's property.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   *
   * **Response limitations**: Customers can only access properties of organizations of which they are members.
   */
  async getProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetOrganizationProperty,
    callback?: never,
  ): Promise<T>;
  async getProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetOrganizationProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/organization/${parameters.organizationId}/property/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the value of a property for an organization. Use this resource to store custom data against an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service Desk Administrator or Agent.
   *
   * Note: Permission to manage organizations can be switched to users with the Jira administrator permission, using the
   * **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  async setProperty<T = unknown>(parameters: Parameters.SetOrganizationProperty, callback: Callback<T>): Promise<void>;
  /**
   * Sets the value of a property for an organization. Use this resource to store custom data against an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service Desk Administrator or Agent.
   *
   * Note: Permission to manage organizations can be switched to users with the Jira administrator permission, using the
   * **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  async setProperty<T = unknown>(parameters: Parameters.SetOrganizationProperty, callback?: never): Promise<T>;
  async setProperty<T = unknown>(
    parameters: Parameters.SetOrganizationProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/organization/${parameters.organizationId}/property/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a property from an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service Desk Administrator or Agent.
   *
   * Note: Permission to manage organizations can be switched to users with the Jira administrator permission, using the
   * **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  async deleteProperty<T = void>(
    parameters: Parameters.DeleteOrganizationProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Removes a property from an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service Desk Administrator or Agent.
   *
   * Note: Permission to manage organizations can be switched to users with the Jira administrator permission, using the
   * **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  async deleteProperty<T = void>(parameters: Parameters.DeleteOrganizationProperty, callback?: never): Promise<T>;
  async deleteProperty<T = void>(
    parameters: Parameters.DeleteOrganizationProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/organization/${parameters.organizationId}/property/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns all the users associated with an organization. Use this method where you want to provide a list
   * of users for an organization or determine if a user is associated with an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator or agent.
   */
  async getUsersInOrganization<T = Models.PagedUser>(
    parameters: Parameters.GetUsersInOrganization,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns all the users associated with an organization. Use this method where you want to provide a list
   * of users for an organization or determine if a user is associated with an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator or agent.
   */
  async getUsersInOrganization<T = Models.PagedUser>(
    parameters: Parameters.GetUsersInOrganization,
    callback?: never,
  ): Promise<T>;
  async getUsersInOrganization<T = Models.PagedUser>(
    parameters: Parameters.GetUsersInOrganization,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/organization/${parameters.organizationId}/user`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method adds users to an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator or agent. Note: Permission to add users to an organization can be switched to users with
   * the Jira administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  async addUsersToOrganization<T = void>(
    parameters: Parameters.AddUsersToOrganization,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method adds users to an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator or agent. Note: Permission to add users to an organization can be switched to users with
   * the Jira administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  async addUsersToOrganization<T = void>(parameters: Parameters.AddUsersToOrganization, callback?: never): Promise<T>;
  async addUsersToOrganization<T = void>(
    parameters: Parameters.AddUsersToOrganization,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/organization/${parameters.organizationId}/user`,
      method: 'POST',
      data: {
        accountIds: parameters.accountIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method removes users from an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator or agent. Note: Permission to delete users from an organization can be switched to users
   * with the Jira administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  async removeUsersFromOrganization<T = void>(
    parameters: Parameters.RemoveUsersFromOrganization,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method removes users from an organization.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator or agent. Note: Permission to delete users from an organization can be switched to users
   * with the Jira administrator permission, using the **[Organization
   * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
   * feature.
   */
  async removeUsersFromOrganization<T = void>(
    parameters: Parameters.RemoveUsersFromOrganization,
    callback?: never,
  ): Promise<T>;
  async removeUsersFromOrganization<T = void>(
    parameters: Parameters.RemoveUsersFromOrganization,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/organization/${parameters.organizationId}/user`,
      method: 'DELETE',
      data: {
        accountIds: parameters.accountIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns a list of all organizations associated with a service desk.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk's agent.
   */
  async getServiceDeskOrganizations<T = Models.PagedOrganization>(
    parameters: Parameters.GetOrganizations,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns a list of all organizations associated with a service desk.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk's agent.
   */
  async getServiceDeskOrganizations<T = Models.PagedOrganization>(
    parameters: Parameters.GetOrganizations,
    callback?: never,
  ): Promise<T>;
  async getServiceDeskOrganizations<T = Models.PagedOrganization>(
    parameters: Parameters.GetOrganizations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/organization`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method adds an organization to a service desk. If the organization ID is already associated with the service
   * desk, no change is made and the resource returns a 204 success code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk's agent.
   */
  async addOrganization<T = void>(parameters: Parameters.AddOrganization, callback: Callback<T>): Promise<void>;
  /**
   * This method adds an organization to a service desk. If the organization ID is already associated with the service
   * desk, no change is made and the resource returns a 204 success code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk's agent.
   */
  async addOrganization<T = void>(parameters: Parameters.AddOrganization, callback?: never): Promise<T>;
  async addOrganization<T = void>(parameters: Parameters.AddOrganization, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/organization`,
      method: 'POST',
      data: {
        organizationId: parameters.organizationId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method removes an organization from a service desk. If the organization ID does not match an organization
   * associated with the service desk, no change is made and the resource returns a 204 success code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk's agent.
   */
  async removeOrganization<T = void>(parameters: Parameters.RemoveOrganization, callback: Callback<T>): Promise<void>;
  /**
   * This method removes an organization from a service desk. If the organization ID does not match an organization
   * associated with the service desk, no change is made and the resource returns a 204 success code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk's agent.
   */
  async removeOrganization<T = void>(parameters: Parameters.RemoveOrganization, callback?: never): Promise<T>;
  async removeOrganization<T = void>(
    parameters: Parameters.RemoveOrganization,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/organization`,
      method: 'DELETE',
      data: {
        organizationId: parameters.organizationId,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
