import { RequestTypePermissionSchema, type RequestTypePermission } from '../models/requestTypePermission';
import type { GetPermissionsByRequestTypeId } from '../parameters/getPermissionsByRequestTypeId';
import type { UpsertRequestTypePermission } from '../parameters/upsertRequestTypePermission';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns the permissions for a customer request type for a given request type ID. These permissions control who can
 * create the customer request. The entities that can be granted permissions are users, groups, and organizations.
 */
export async function getPermissionsByRequestTypeId(
  client: Client,
  parameters: GetPermissionsByRequestTypeId,
  options?: RequestOptions,
): Promise<RequestTypePermission> {
  const config: SendRequestOptions<RequestTypePermission> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}/permission`,
    method: 'GET',
    schema: RequestTypePermissionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Upsert the permissions for a customer request type. This operation will overwrite any existing permissions. */
export async function upsertRequestTypePermission(
  client: Client,
  parameters: UpsertRequestTypePermission,
  options?: RequestOptions,
): Promise<RequestTypePermission> {
  const config: SendRequestOptions<RequestTypePermission> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}/permission`,
    method: 'PUT',
    body: {
      allowlist: parameters.allowlist,
    },
    schema: RequestTypePermissionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
