import { ApplicationRoleSchema, type ApplicationRole } from '../models/applicationRole';
import type { PutBulk } from '../parameters/putBulk';
import type { GetApplicationRole } from '../parameters/getApplicationRole';
import type { UpdateApplicationRole } from '../parameters/updateApplicationRole';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Returns all application roles in the system. */
export async function getAll(client: Client, options?: RequestOptions): Promise<ApplicationRole[]> {
  const config: SendRequestOptions<ApplicationRole[]> = {
    url: '/rest/api/2/applicationrole',
    method: 'GET',
    schema: z.array(ApplicationRoleSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the ApplicationRoles with the passed data if the version hash is the same as the server. Only the groups and
 * default groups setting of the role may be updated. Requests to change the key or the name of the role will be
 * silently ignored. It is acceptable to pass only the roles that are updated as roles that are present in the server
 * but not in data to update with, will not be deleted.
 */
export async function putBulk(client: Client, parameters: PutBulk, options?: RequestOptions): Promise<ApplicationRole> {
  const config: SendRequestOptions<ApplicationRole> = {
    url: '/rest/api/2/applicationrole',
    method: 'PUT',
    headers: {
      ...(parameters['If-Match'] === undefined ? {} : { 'If-Match': parameters['If-Match'] }),
    },
    body: {
      defaultGroups: parameters.defaultGroups,
      defined: parameters.defined,
      groups: parameters.groups,
      hasUnlimitedSeats: parameters.hasUnlimitedSeats,
      key: parameters.key,
      name: parameters.name,
      numberOfSeats: parameters.numberOfSeats,
      platform: parameters.platform,
      remainingSeats: parameters.remainingSeats,
      selectedByDefault: parameters.selectedByDefault,
      userCount: parameters.userCount,
      userCountDescription: parameters.userCountDescription,
    },
    schema: ApplicationRoleSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the ApplicationRole with passed key if it exists. */
export async function getApplicationRole(
  client: Client,
  parameters: GetApplicationRole,
  options?: RequestOptions,
): Promise<ApplicationRole> {
  const config: SendRequestOptions<ApplicationRole> = {
    url: `/rest/api/2/applicationrole/${parameters.key}`,
    method: 'GET',
    schema: ApplicationRoleSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the ApplicationRole with the passed data. Only the groups and default groups setting of the role may be
 * updated. Requests to change the key or the name of the role will be silently ignored.
 */
export async function updateApplicationRole(
  client: Client,
  parameters: UpdateApplicationRole,
  options?: RequestOptions,
): Promise<ApplicationRole> {
  const config: SendRequestOptions<ApplicationRole> = {
    url: `/rest/api/2/applicationrole/${parameters.key}`,
    method: 'PUT',
    headers: {
      ...(parameters['If-Match'] === undefined ? {} : { 'If-Match': parameters['If-Match'] }),
      ...(parameters.versionHash === undefined ? {} : { versionHash: parameters.versionHash }),
    },
    body: parameters.body,
    schema: ApplicationRoleSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
