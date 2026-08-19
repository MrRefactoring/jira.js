import { PagedOrganizationSchema } from '../models/pagedOrganization';
import type { Page } from '../models/page';
import { OrganizationSchema, type Organization } from '../models/organization';
import { PropertyKeysSchema, type PropertyKeys } from '../models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import { PagedUserSchema } from '../models/pagedUser';
import type { User } from '../models/user';
import type { GetOrganizations } from '../parameters/getOrganizations';
import type { CreateOrganization } from '../parameters/createOrganization';
import type { GetOrganization } from '../parameters/getOrganization';
import type { DeleteOrganization } from '../parameters/deleteOrganization';
import type { GetPropertiesKeys } from '../parameters/getPropertiesKeys';
import type { GetProperty } from '../parameters/getProperty';
import type { SetProperty } from '../parameters/setProperty';
import type { DeleteProperty } from '../parameters/deleteProperty';
import type { GetUsersInOrganization } from '../parameters/getUsersInOrganization';
import type { AddUsersToOrganization } from '../parameters/addUsersToOrganization';
import type { RemoveUsersFromOrganization } from '../parameters/removeUsersFromOrganization';
import type { GetServiceDeskOrganizations } from '../parameters/getServiceDeskOrganizations';
import type { AddOrganization } from '../parameters/addOrganization';
import type { RemoveOrganization } from '../parameters/removeOrganization';
import type { Client, SendRequestOptions } from '#/core';

/**
 * This method returns a list of organizations in the Jira Service Management instance. Use this method when you want to
 * present a list of organizations or want to locate an organization by name.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Any.
 * However, to fetch organizations based on `accountId` the user must have a Service Desk agent license.
 *
 * **Response limitations**: If the user is a customer, only those organizations of which the customer is a member are
 * listed.
 */
export async function getOrganizations(client: Client, parameters?: GetOrganizations): Promise<Page<Organization>> {
  const config: SendRequestOptions<Page<Organization>> = {
    url: '/rest/servicedeskapi/organization',
    method: 'GET',
    searchParams: {
      start: parameters?.start,
      limit: parameters?.limit,
      accountId: parameters?.accountId,
    },
    schema: PagedOrganizationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method creates an organization by passing the name of the organization.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * desk administrator or agent. Note: Permission to create organizations can be switched to users with the Jira
 * administrator permission, using the **[Organization
 * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
 * feature.
 */
export async function createOrganization(client: Client, parameters: CreateOrganization): Promise<Organization> {
  const config: SendRequestOptions<Organization> = {
    url: '/rest/servicedeskapi/organization',
    method: 'POST',
    body: {
      name: parameters.name,
    },
    schema: OrganizationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns details of an organization. Use this method to get organization details whenever your application
 * component is passed an organization ID but needs to display other organization details.
 *
 * To get organization detail field values which are visible in Jira Service Management, see the [Customer Service
 * Management REST
 * API](https://developer.atlassian.com/cloud/customer-service-management/rest/v1/api-group-organization/#api-group-organization).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Any
 *
 * **Response limitations**: Customers can only retrieve organization of which they are members.
 */
export async function getOrganization(client: Client, parameters: GetOrganization): Promise<Organization> {
  const config: SendRequestOptions<Organization> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}`,
    method: 'GET',
    schema: OrganizationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method deletes an organization. Note that the organization is deleted regardless of other associations it may
 * have. For example, associations with service desks.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Jira
 * administrator.
 */
export async function deleteOrganization(client: Client, parameters: DeleteOrganization): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the keys of all organization properties. Organization properties are a type of entity property which are
 * available to the API only, and not shown in Jira Service Management. [Learn
 * more](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 *
 * To get organization detail field values which are visible in Jira Service Management, see the [Customer Service
 * Management REST
 * API](https://developer.atlassian.com/cloud/customer-service-management/rest/v1/api-group-organization/#api-group-organization).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Any
 *
 * **Response limitations**: Customers can only access properties of organizations of which they are members.
 */
export async function getPropertiesKeys(client: Client, parameters: GetPropertiesKeys): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}/property`,
    method: 'GET',
    schema: PropertyKeysSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the value of an organization property. Use this method to obtain the JSON content for an organization's
 * property. Organization properties are a type of entity property which are available to the API only, and not shown in
 * Jira Service Management. [Learn more](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 *
 * To get organization detail field values which are visible in Jira Service Management, see the [Customer Service
 * Management REST
 * API](https://developer.atlassian.com/cloud/customer-service-management/rest/v1/api-group-organization/#api-group-organization).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Any
 *
 * **Response limitations**: Customers can only access properties of organizations of which they are members.
 */
export async function getProperty(client: Client, parameters: GetProperty): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}/property/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of an organization property. Use this resource to store custom data against an organization.
 * Organization properties are a type of entity property which are available to the API only, and not shown in Jira
 * Service Management. [Learn more](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 *
 * To store organization detail field values which are visible in Jira Service Management, see the [Customer Service
 * Management REST
 * API](https://developer.atlassian.com/cloud/customer-service-management/rest/v1/api-group-organization/#api-group-organization).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * Desk Administrator or Agent.
 *
 * Note: Permission to manage organizations can be switched to users with the Jira administrator permission, using the
 * **[Organization
 * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
 * feature.
 */
export async function setProperty(client: Client, parameters: SetProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}/property/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Removes an organization property. Organization properties are a type of entity property which are available to the
 * API only, and not shown in Jira Service Management. [Learn
 * more](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/).
 *
 * For operations relating to organization detail field values which are visible in Jira Service Management, see the
 * [Customer Service Management REST
 * API](https://developer.atlassian.com/cloud/customer-service-management/rest/v1/api-group-organization/#api-group-organization).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * Desk Administrator or Agent.
 *
 * Note: Permission to manage organizations can be switched to users with the Jira administrator permission, using the
 * **[Organization
 * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
 * feature.
 */
export async function deleteProperty(client: Client, parameters: DeleteProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}/property/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * This method returns all the users associated with an organization. Use this method where you want to provide a list
 * of users for an organization or determine if a user is associated with an organization.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * desk administrator or agent.
 */
export async function getUsersInOrganization(client: Client, parameters: GetUsersInOrganization): Promise<Page<User>> {
  const config: SendRequestOptions<Page<User>> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}/user`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedUserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method adds users to an organization.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * desk administrator or agent. Note: Permission to add users to an organization can be switched to users with the Jira
 * administrator permission, using the **[Organization
 * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
 * feature.
 */
export async function addUsersToOrganization(client: Client, parameters: AddUsersToOrganization): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}/user`,
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * This method removes users from an organization.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * desk administrator or agent. Note: Permission to delete users from an organization can be switched to users with the
 * Jira administrator permission, using the **[Organization
 * management](https://confluence.atlassian.com/servicedeskcloud/setting-up-service-desk-users-732528877.html#Settingupservicedeskusers-manageorgsManageorganizations)**
 * feature.
 */
export async function removeUsersFromOrganization(
  client: Client,
  parameters: RemoveUsersFromOrganization,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}/user`,
    method: 'DELETE',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns a list of all organizations associated with a service desk.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * desk's agent.
 */
export async function getServiceDeskOrganizations(
  client: Client,
  parameters: GetServiceDeskOrganizations,
): Promise<Page<Organization>> {
  const config: SendRequestOptions<Page<Organization>> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/organization`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
      accountId: parameters.accountId,
    },
    schema: PagedOrganizationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method adds an organization to a service desk. If the organization ID is already associated with the service
 * desk, no change is made and the resource returns a 204 success code.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * desk's agent.
 */
export async function addOrganization(client: Client, parameters: AddOrganization): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/organization`,
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * This method removes an organization from a service desk. If the organization ID does not match an organization
 * associated with the service desk, no change is made and the resource returns a 204 success code.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * desk's agent.
 */
export async function removeOrganization(client: Client, parameters: RemoveOrganization): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/organization`,
    method: 'DELETE',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}
