import { PagedUserSchema } from '../models/pagedUser';
import type { Page } from '../models/page';
import type { User } from '../models/user';
import { CustomerOrganizationSchema, type CustomerOrganization } from '../models/customerOrganization';
import { PagedOrganizationSchema } from '../models/pagedOrganization';
import { OrganizationSchema, type Organization } from '../models/organization';
import type { GetUsersInOrganization } from '../parameters/getUsersInOrganization';
import type { AddUsersToOrganization } from '../parameters/addUsersToOrganization';
import type { RemoveUsersFromOrganization } from '../parameters/removeUsersFromOrganization';
import type { PreviewCleanUpOrganizations } from '../parameters/previewCleanUpOrganizations';
import type { CleanUpOrganizations } from '../parameters/cleanUpOrganizations';
import type { GetOrganizations } from '../parameters/getOrganizations';
import type { CreateOrganization } from '../parameters/createOrganization';
import type { GetOrganization } from '../parameters/getOrganization';
import type { DeleteOrganization } from '../parameters/deleteOrganization';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns all the users of a specified organization. */
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

/** Adds users to an organization. */
export async function addUsersToOrganization(client: Client, parameters: AddUsersToOrganization): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}/user`,
    method: 'POST',
    body: {
      usernames: parameters.usernames,
    },
  };

  return await client.sendRequest(config);
}

/** Removes users from an organization. */
export async function removeUsersFromOrganization(
  client: Client,
  parameters: RemoveUsersFromOrganization,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}/user`,
    method: 'DELETE',
    body: {
      usernames: parameters.usernames,
    },
  };

  return await client.sendRequest(config);
}

/** Preview the cleanup of empty organizations, with the same support parameters. */
export async function previewCleanUpOrganizations(
  client: Client,
  parameters?: PreviewCleanUpOrganizations,
): Promise<CustomerOrganization[]> {
  const config: SendRequestOptions<CustomerOrganization[]> = {
    url: '/rest/servicedeskapi/organization/cleanup',
    method: 'GET',
    searchParams: {
      deleteDetachedOrganizations: parameters?.deleteDetachedOrganizations,
      deleteOrganizationsWithInactiveUsers: parameters?.deleteOrganizationsWithInactiveUsers,
    },
    schema: z.array(CustomerOrganizationSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Deletes empty organizations, optionally delete organizations that have no active users, or are not attached to any
 * projects.
 */
export async function cleanUpOrganizations(client: Client, parameters: CleanUpOrganizations): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/servicedeskapi/organization/cleanup',
    method: 'DELETE',
    searchParams: {
      deleteDetachedOrganizations: parameters.deleteDetachedOrganizations,
      deleteOrganizationsWithInactiveUsers: parameters.deleteOrganizationsWithInactiveUsers,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of organizations in the Jira instance.If the user is not an agent, the resource returns a list of
 * organizations the user is a member of.
 */
export async function getOrganizations(client: Client, parameters?: GetOrganizations): Promise<Page<Organization>> {
  const config: SendRequestOptions<Page<Organization>> = {
    url: '/rest/servicedeskapi/organization',
    method: 'GET',
    searchParams: {
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: PagedOrganizationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * To create an organization Jira administrator global permission or agent permission is required depending on the
 * settings
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

/** Returns an organization for a given organization ID. */
export async function getOrganization(client: Client, parameters: GetOrganization): Promise<Organization> {
  const config: SendRequestOptions<Organization> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}`,
    method: 'GET',
    schema: OrganizationSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes an organization for a given organization ID. */
export async function deleteOrganization(client: Client, parameters: DeleteOrganization): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/organization/${parameters.organizationId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
