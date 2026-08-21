import { CustomerRequestCreateMetaSchema, type CustomerRequestCreateMeta } from '../models/customerRequestCreateMeta';
import { PagedRequestTypeGroupSchema } from '../models/pagedRequestTypeGroup';
import type { Page } from '../models/page';
import type { RequestTypeGroup } from '../models/requestTypeGroup';
import { PagedRequestTypeSchema } from '../models/pagedRequestType';
import { RequestTypeSchema, type RequestType } from '../models/requestType';
import type { GetRequestTypeFields } from '../parameters/getRequestTypeFields';
import type { GetRequestTypeGroups } from '../parameters/getRequestTypeGroups';
import type { GetRequestTypes } from '../parameters/getRequestTypes';
import type { CreateRequestType } from '../parameters/createRequestType';
import type { UpdateRequestType } from '../parameters/updateRequestType';
import type { GetRequestTypeById } from '../parameters/getRequestTypeById';
import type { DeleteRequestType } from '../parameters/deleteRequestType';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns the fields for a request type, for a given request type Id and service project Id. These are the fields that
 * are required to create a customer request of that particular request type.
 *
 * In addition, the following information about the current user's permissions for the request type is returned:
 *
 * - `canRaiseOnBehalfOf` field - Returns true, if the user has permission to raise requests on behalf of customers.
 *   Otherwise, returns false.
 * - `canAddRequestParticipants` field - Returns true, if the user can add request participants. Otherwise, returns false.
 */
export async function getRequestTypeFields(
  client: Client,
  parameters: GetRequestTypeFields,
): Promise<CustomerRequestCreateMeta> {
  const config: SendRequestOptions<CustomerRequestCreateMeta> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}/field`,
    method: 'GET',
    schema: CustomerRequestCreateMetaSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all request type groups from a service project, for a given service project Id. The groups will be in the
 * same order as the order in which they appear on the customer portal
 */
export async function getRequestTypeGroups(
  client: Client,
  parameters: GetRequestTypeGroups,
): Promise<Page<RequestTypeGroup>> {
  const config: SendRequestOptions<Page<RequestTypeGroup>> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttypegroup`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedRequestTypeGroupSchema,
  };

  return await client.sendRequest(config);
}

/** Returns all request types from a service project, for a given service project Id. */
export async function getRequestTypes(client: Client, parameters: GetRequestTypes): Promise<Page<RequestType>> {
  const config: SendRequestOptions<Page<RequestType>> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype`,
    method: 'GET',
    searchParams: {
      groupId: parameters.groupId,
      restrictionStatus: parameters.restrictionStatus,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedRequestTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new request type for a given service project. Certain fields cannot be specified on creation. These fields
 * are given default values instead, as shown below.
 *
 * Request Type icon - Question mark icon
 *
 * Request Type groups - Empty, i.e. this request type will be hidden by default and not visible on the customer portal
 *
 * Request Type status mapping - Empty, i.e. no custom status mapping
 *
 * Request Type field mapping - Show the required fields as specified by the issue type
 *
 * These fields can be updated after creation by a project administrator using the Agent view.
 *
 * **Permissions:**
 *
 * The calling user must be a project administrator for the service project project.
 */
export async function createRequestType(client: Client, parameters: CreateRequestType): Promise<RequestType> {
  const config: SendRequestOptions<RequestType> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype`,
    method: 'POST',
    body: {
      issueTypeId: parameters.issueTypeId,
      name: parameters.name,
      description: parameters.description,
      helpText: parameters.helpText,
    },
    schema: RequestTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a request type for a given service project. Note Issue Type cannot be changed.
 *
 * **Permissions:**
 *
 * The calling user must be a project administrator for the service project project.
 */
export async function updateRequestType(client: Client, parameters: UpdateRequestType): Promise<RequestType> {
  const config: SendRequestOptions<RequestType> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype`,
    method: 'PUT',
    body: {
      description: parameters.description,
      helpText: parameters.helpText,
      name: parameters.name,
      requestTypeId: parameters.requestTypeId,
    },
    schema: RequestTypeSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a request type for a given request type Id. */
export async function getRequestTypeById(client: Client, parameters: GetRequestTypeById): Promise<RequestType> {
  const config: SendRequestOptions<RequestType> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}`,
    method: 'GET',
    searchParams: {
      restrictionStatus: parameters.restrictionStatus,
    },
    schema: RequestTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a request type for a given service project.
 *
 * **Permissions:**
 *
 * The calling user must be a project administrator for the service project project.
 */
export async function deleteRequestType(client: Client, parameters: DeleteRequestType): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
