import { PagedCommentSchema } from '../models/pagedComment';
import type { Page } from '../models/page';
import { CommentSchema, type Comment } from '../models/comment';
import { PagedCustomerRequestSchema } from '../models/pagedCustomerRequest';
import { CustomerRequestSchema, type CustomerRequest } from '../models/customerRequest';
import { PagedUserSchema } from '../models/pagedUser';
import type { User } from '../models/user';
import { PagedSlaInformationSchema } from '../models/pagedSlaInformation';
import { SlaInformationSchema, type SlaInformation } from '../models/slaInformation';
import { PagedCustomerRequestStatusSchema } from '../models/pagedCustomerRequestStatus';
import type { CustomerRequestStatus } from '../models/customerRequestStatus';
import type { GetRequestComments } from '../parameters/getRequestComments';
import type { CreateRequestComment } from '../parameters/createRequestComment';
import type { GetRequestCommentById } from '../parameters/getRequestCommentById';
import type { GetMyCustomerRequests } from '../parameters/getMyCustomerRequests';
import type { CreateCustomerRequest } from '../parameters/createCustomerRequest';
import type { GetCustomerRequestByIdOrKey } from '../parameters/getCustomerRequestByIdOrKey';
import type { GetRequestParticipants } from '../parameters/getRequestParticipants';
import type { AddRequestParticipants } from '../parameters/addRequestParticipants';
import type { RemoveRequestParticipants } from '../parameters/removeRequestParticipants';
import type { GetSlaInformation } from '../parameters/getSlaInformation';
import type { GetSlaInformationById } from '../parameters/getSlaInformationById';
import type { GetCustomerRequestStatus } from '../parameters/getCustomerRequestStatus';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns all comments on a customer request, for a given request Id/key.
 *
 * **Permissions:**
 *
 * Only comments that the calling user can see are returned.
 */
export async function getRequestComments(client: Client, parameters: GetRequestComments): Promise<Page<Comment>> {
  const config: SendRequestOptions<Page<Comment>> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/comment`,
    method: 'GET',
    searchParams: {
      internal: parameters.internal,
      public: parameters.public,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedCommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Add a public or internal comment on an existing customer request. The currently logged-in user will be the author of
 * the comment. The comment visibility is set by the `public` field.
 *
 * **Permissions:**
 *
 * Setting comment visibility depends on the calling user's permissions. For example, Agents can create either public or
 * internal comments, Unlicensed users can only create internal comments, and Customers can only create public
 * comments.
 */
export async function createRequestComment(client: Client, parameters: CreateRequestComment): Promise<Comment> {
  const config: SendRequestOptions<Comment> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/comment`,
    method: 'POST',
    body: {
      body: parameters.body,
      public: parameters.public,
    },
    schema: CommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific comment of a specific customer request based on the provided comment ID.
 *
 * **Permissions:**
 *
 * The calling user must have permission to view the comment. For example, customers can only view public comments on
 * requests where they are the reporter or a participant whereas agents can see both internal and public comments.
 */
export async function getRequestCommentById(client: Client, parameters: GetRequestCommentById): Promise<Comment> {
  const config: SendRequestOptions<Comment> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/comment/${parameters.commentId}`,
    method: 'GET',
    schema: CommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all customer requests for the user that is executing the query. That is, the customer requests where the user
 * is the creator of the customer request or has participated in the customer request.
 *
 * Returned customer requests are ordered chronologically by the latest activity on each customer request. For example,
 * the latest status transition or comment.
 *
 * **Note:** The total number of issues across all pages that can be returned using paginated search is limited to the
 * maxResultWindow, which is defined by the underlying search engine. The current value is returned in the
 * `maxResultWindow` property of the response. If not set, it means there is no limit.
 */
export async function getMyCustomerRequests(
  client: Client,
  parameters?: GetMyCustomerRequests,
): Promise<Page<CustomerRequest>> {
  const config: SendRequestOptions<Page<CustomerRequest>> = {
    url: '/rest/servicedeskapi/request',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
      searchTerm: parameters?.searchTerm,
      serviceDeskId: parameters?.serviceDeskId,
      requestOwnership: parameters?.requestOwnership,
      requestTypeId: parameters?.requestTypeId,
      requestStatus: parameters?.requestStatus,
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: PagedCustomerRequestSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a customer request in a service project. The service project and request type are required. The fields that
 * are mandatory for the request type are also required. If you need the list of the fields required for the request
 * type, you can get it via this resource:
 * [servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/field](#servicedeskapi-servicedesk-{serviceDeskId}-requesttype-{requestTypeId}-field-get)
 *
 * **Notes**:
 *
 * - The fields for a request type may vary based on the permissions of the currently authenticated user:
 *
 *   - `raiseOnBehalfOf` field - Not available to users who only have the Service Desk Customer permission.
 *   - `requestParticipants` field - Not available to users who only have the Service Desk Customer permission or if the
 *       feature is turned off for customers.
 * - Schema of `requestFieldValues` field is a map of Jira's field's ID and its value, which are JSON ready objects. The
 *   object value will be interpreted with JSON semantics according to the specific field requirements. So a simple
 *   field like summary or number customer field might take String / Integer while other fields like Multi User Picker
 *   will take a more complex object that has JSON semantics. Refer to [Field input
 *   formats](https://developer.atlassian.com/server/jira-servicedesk/rest/intro#fieldformats) reference on what field
 *   types take what values.
 */
export async function createCustomerRequest(
  client: Client,
  parameters: CreateCustomerRequest,
): Promise<CustomerRequest> {
  const config: SendRequestOptions<CustomerRequest> = {
    url: '/rest/servicedeskapi/request',
    method: 'POST',
    body: {
      serviceDeskId: parameters.serviceDeskId,
      requestTypeId: parameters.requestTypeId,
      requestFieldValues: parameters.requestFieldValues,
      requestParticipants: parameters.requestParticipants,
      raiseOnBehalfOf: parameters.raiseOnBehalfOf,
    },
    schema: CustomerRequestSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the customer request for a given request Id/key. */
export async function getCustomerRequestByIdOrKey(
  client: Client,
  parameters: GetCustomerRequestByIdOrKey,
): Promise<CustomerRequest> {
  const config: SendRequestOptions<CustomerRequest> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: CustomerRequestSchema,
  };

  return await client.sendRequest(config);
}

/** Returns all users participating in a customer request, for a given request Id/key. */
export async function getRequestParticipants(client: Client, parameters: GetRequestParticipants): Promise<Page<User>> {
  const config: SendRequestOptions<Page<User>> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/participant`,
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
 * Adds users as participants to an existing customer request.
 *
 * Note, you can also add participants when creating a request via the `request` resource, by using the
 * `requestParticipants` field.
 *
 * **Permissions:**
 *
 * The calling user must have permission to manage participants for this customer request.
 */
export async function addRequestParticipants(client: Client, parameters: AddRequestParticipants): Promise<Page<User>> {
  const config: SendRequestOptions<Page<User>> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/participant`,
    method: 'POST',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    body: {
      usernames: parameters.usernames,
    },
    schema: PagedUserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Removes participants from an existing customer request.
 *
 * **Permissions:**
 *
 * The calling user must have permission to manage participants for this customer request.
 */
export async function removeRequestParticipants(
  client: Client,
  parameters: RemoveRequestParticipants,
): Promise<Page<User>> {
  const config: SendRequestOptions<Page<User>> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/participant`,
    method: 'DELETE',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    body: {
      usernames: parameters.usernames,
    },
    schema: PagedUserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the SLA information for a customer request for a given request Id/key.A request can have zero or more SLA
 * values. Each SLA value can have zero or more "completed cycles" and zero or 1 "ongoing cycles".Each cycle has
 * information on when it started and stopped, and whether it breached the SLA goal.
 *
 * **Permissions:**
 *
 * The calling user must be an agent.
 */
export async function getSlaInformation(client: Client, parameters: GetSlaInformation): Promise<Page<SlaInformation>> {
  const config: SendRequestOptions<Page<SlaInformation>> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/sla`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedSlaInformationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the SLA information for a customer request for a given request Id/key and SLA metric Id.A request can have
 * zero or more SLA values. Each SLA value can have zero or more "completed cycles" and zero or 1 "ongoing cycles".Each
 * cycle has information on when it started and stopped, and whether it breached the SLA goal.
 *
 * **Permissions:**
 *
 * The calling user must be an agent.
 */
export async function getSlaInformationById(
  client: Client,
  parameters: GetSlaInformationById,
): Promise<SlaInformation> {
  const config: SendRequestOptions<SlaInformation> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/sla/${parameters.slaMetricId}`,
    method: 'GET',
    schema: SlaInformationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the status transitions for a customer request for a given request Id/key. The status transitions are returned
 * in chronological order.
 */
export async function getCustomerRequestStatus(
  client: Client,
  parameters: GetCustomerRequestStatus,
): Promise<Page<CustomerRequestStatus>> {
  const config: SendRequestOptions<Page<CustomerRequestStatus>> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/status`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedCustomerRequestStatusSchema,
  };

  return await client.sendRequest(config);
}
