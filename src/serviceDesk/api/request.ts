import { PagedCustomerRequestSchema, type PagedCustomerRequest } from '../models/pagedCustomerRequest';
import { CustomerRequestSchema, type CustomerRequest } from '../models/customerRequest';
import { PagedApprovalSchema, type PagedApproval } from '../models/pagedApproval';
import { ApprovalSchema, type Approval } from '../models/approval';
import { PagedAttachmentSchema, type PagedAttachment } from '../models/pagedAttachment';
import { AttachmentCreateResultSchema, type AttachmentCreateResult } from '../models/attachmentCreateResult';
import { PagedCommentSchema, type PagedComment } from '../models/pagedComment';
import { CommentSchema, type Comment } from '../models/comment';
import {
  RequestNotificationSubscriptionSchema,
  type RequestNotificationSubscription,
} from '../models/requestNotificationSubscription';
import { PagedUserSchema, type PagedUser } from '../models/pagedUser';
import { PagedSlaInformationSchema, type PagedSlaInformation } from '../models/pagedSlaInformation';
import { SlaInformationSchema, type SlaInformation } from '../models/slaInformation';
import {
  PagedCustomerRequestStatusSchema,
  type PagedCustomerRequestStatus,
} from '../models/pagedCustomerRequestStatus';
import { PagedCustomerTransitionSchema, type PagedCustomerTransition } from '../models/pagedCustomerTransition';
import type { GetCustomerRequests } from '../parameters/getCustomerRequests';
import type { CreateCustomerRequest } from '../parameters/createCustomerRequest';
import type { GetCustomerRequestByIdOrKey } from '../parameters/getCustomerRequestByIdOrKey';
import type { GetApprovals } from '../parameters/getApprovals';
import type { GetApprovalById } from '../parameters/getApprovalById';
import type { AnswerApproval } from '../parameters/answerApproval';
import type { GetAttachmentsForRequest } from '../parameters/getAttachmentsForRequest';
import type { CreateCommentWithAttachment } from '../parameters/createCommentWithAttachment';
import type { GetAttachmentContent } from '../parameters/getAttachmentContent';
import type { GetAttachmentThumbnail } from '../parameters/getAttachmentThumbnail';
import type { GetRequestComments } from '../parameters/getRequestComments';
import type { CreateRequestComment } from '../parameters/createRequestComment';
import type { GetRequestCommentById } from '../parameters/getRequestCommentById';
import type { GetSubscriptionStatus } from '../parameters/getSubscriptionStatus';
import type { Subscribe } from '../parameters/subscribe';
import type { Unsubscribe } from '../parameters/unsubscribe';
import type { GetRequestParticipants } from '../parameters/getRequestParticipants';
import type { AddRequestParticipants } from '../parameters/addRequestParticipants';
import type { RemoveRequestParticipants } from '../parameters/removeRequestParticipants';
import type { GetSlaInformation } from '../parameters/getSlaInformation';
import type { GetSlaInformationById } from '../parameters/getSlaInformationById';
import type { GetCustomerRequestStatus } from '../parameters/getCustomerRequestStatus';
import type { GetCustomerTransitions } from '../parameters/getCustomerTransitions';
import type { PerformCustomerTransition } from '../parameters/performCustomerTransition';
import type { Client, SendRequestOptions } from '#/core';

/**
 * This method returns all customer requests for the user executing the query.
 *
 * The returned customer requests are ordered chronologically by the latest activity on each request. For example, the
 * latest status transition or comment.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to access the specified service desk.
 *
 * **Response limitations**: For customers, the list returned will include request they created (or were created on
 * their behalf) or are participating in only.
 */
export async function getCustomerRequests(
  client: Client,
  parameters?: GetCustomerRequests,
): Promise<PagedCustomerRequest> {
  const config: SendRequestOptions<PagedCustomerRequest> = {
    url: '/rest/servicedeskapi/request',
    method: 'GET',
    searchParams: {
      searchTerm: parameters?.searchTerm,
      requestOwnership: parameters?.requestOwnership,
      requestStatus: parameters?.requestStatus,
      approvalStatus: parameters?.approvalStatus,
      organizationId: parameters?.organizationId,
      serviceDeskId: parameters?.serviceDeskId,
      requestTypeId: parameters?.requestTypeId,
      expand: parameters?.expand,
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: PagedCustomerRequestSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method creates a customer request in a service desk.
 *
 * The JSON request must include the service desk and customer request type, as well as any fields that are required for
 * the request type. A list of the fields required by a customer request type can be obtained using
 * [servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/field](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#api-servicedesk-serviceDeskId-requesttype-requestTypeId-field-get).
 *
 * The fields required for a customer request type depend on the user's permissions:
 *
 * - `raiseOnBehalfOf` is not available to Users who have the customer permission only.
 * - `requestParticipants` is not available to Users who have the customer permission only or if the feature is turned off
 *   for customers.
 *
 * `requestFieldValues` is a map of Jira field IDs and their values. See [Field input
 * formats](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#fieldformats), for details of each
 * field's JSON semantics and the values they can take.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to create requests in the specified service desk.
 */
export async function createCustomerRequest(
  client: Client,
  parameters: CreateCustomerRequest,
): Promise<CustomerRequest> {
  const config: SendRequestOptions<CustomerRequest> = {
    url: '/rest/servicedeskapi/request',
    method: 'POST',
    body: {
      channel: parameters.channel,
      form: parameters.form,
      isAdfRequest: parameters.isAdfRequest,
      raiseOnBehalfOf: parameters.raiseOnBehalfOf,
      requestFieldValues: parameters.requestFieldValues,
      requestParticipants: parameters.requestParticipants,
      requestTypeId: parameters.requestTypeId,
      serviceDeskId: parameters.serviceDeskId,
    },
    schema: CustomerRequestSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns a customer request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to access the specified service desk.
 *
 * **Response limitations**: For customers, only a request they created, was created on their behalf, or they are
 * participating in will be returned.
 *
 * **Note:** `requestFieldValues` does not include hidden fields. To get a list of request type fields that includes
 * hidden fields, see
 * [/rest/servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/field](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-rest-servicedeskapi-servicedesk-servicedeskid-requesttype-requesttypeid-field-get)
 */
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

/**
 * This method returns all approvals on a customer request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 */
export async function getApprovals(client: Client, parameters: GetApprovals): Promise<PagedApproval> {
  const config: SendRequestOptions<PagedApproval> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/approval`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedApprovalSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns an approval. Use this method to determine the status of an approval and the list of approvers.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 */
export async function getApprovalById(client: Client, parameters: GetApprovalById): Promise<Approval> {
  const config: SendRequestOptions<Approval> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/approval/${parameters.approvalId}`,
    method: 'GET',
    schema: ApprovalSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method enables a user to **Approve** or **Decline** an approval on a customer request. The approval is assumed
 * to be owned by the user making the call.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: User is
 * assigned to the approval request.
 */
export async function answerApproval(client: Client, parameters: AnswerApproval): Promise<Approval> {
  const config: SendRequestOptions<Approval> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/approval/${parameters.approvalId}`,
    method: 'POST',
    body: {
      decision: parameters.decision,
    },
    schema: ApprovalSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns all the attachments for a customer requests.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 *
 * **Response limitations**: Customers will only get a list of public attachments.
 */
export async function getAttachmentsForRequest(
  client: Client,
  parameters: GetAttachmentsForRequest,
): Promise<PagedAttachment> {
  const config: SendRequestOptions<PagedAttachment> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/attachment`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedAttachmentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method creates a comment on a customer request using one or more attachment files (uploaded using
 * [servicedeskapi/servicedesk/{serviceDeskId}/attachTemporaryFile](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-rest-servicedeskapi-servicedesk-servicedeskid-attachtemporaryfile-post)),
 * with the visibility set by `public`. See
 *
 * - GET
 *   [servicedeskapi/request/{issueIdOrKey}/attachment](./#api-rest-servicedeskapi-request-issueidorkey-attachment-get)
 * - GET
 *   [servicedeskapi/request/{issueIdOrKey}/comment/{commentId}/attachment](./#api-rest-servicedeskapi-request-issueidorkey-comment-commentid-attachment-get)
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to add an attachment.
 *
 * **Request limitations**: Customers can set public visibility only.
 */
export async function createCommentWithAttachment(
  client: Client,
  parameters: CreateCommentWithAttachment,
): Promise<AttachmentCreateResult> {
  const config: SendRequestOptions<AttachmentCreateResult> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/attachment`,
    method: 'POST',
    body: {
      additionalComment: parameters.additionalComment,
      public: parameters.public,
      temporaryAttachmentIds: parameters.temporaryAttachmentIds,
    },
    schema: AttachmentCreateResultSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the contents of an attachment.
 *
 * To return a thumbnail of the attachment, use
 * [servicedeskapi/request/{issueIdOrKey}/attachment/{attachmentId}/thumbnail](./#api-rest-servicedeskapi-request-issueidorkey-attachment-attachmentid-thumbnail-get).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required:** For the
 * issue containing the attachment:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function getAttachmentContent(client: Client, parameters: GetAttachmentContent): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/attachment/${parameters.attachmentId}`,
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the thumbnail of an attachment.
 *
 * To return the attachment contents, use
 * [servicedeskapi/request/{issueIdOrKey}/attachment/{attachmentId}](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#api-rest-servicedeskapi-request-issueidorkey-attachment-attachmentid-get).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required:** For the
 * issue containing the attachment:
 *
 * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
 *   in.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function getAttachmentThumbnail(client: Client, parameters: GetAttachmentThumbnail): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/attachment/${parameters.attachmentId}/thumbnail`,
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/**
 * This method returns all comments on a customer request. No permissions error is provided if, for example, the user
 * doesn't have access to the service desk or request, the method simply returns an empty response.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 *
 * **Response limitations**: Customers are returned public comments only.
 */
export async function getRequestComments(client: Client, parameters: GetRequestComments): Promise<PagedComment> {
  const config: SendRequestOptions<PagedComment> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/comment`,
    method: 'GET',
    searchParams: {
      public: parameters.public,
      internal: parameters.internal,
      expand: parameters.expand,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedCommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method creates a public or private (internal) comment on a customer request, with the comment visibility set by
 * `public`. The user recorded as the author of the comment.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: User has
 * Add Comments permission.
 *
 * **Request limitations**: Customers can set comments to public visibility only.
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
 * This method returns details of a customer request's comment.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 *
 * **Response limitations**: Customers can only view public comments on requests where they are the reporter or a
 * participant whereas agents can see both internal and public comments.
 */
export async function getRequestCommentById(client: Client, parameters: GetRequestCommentById): Promise<Comment> {
  const config: SendRequestOptions<Comment> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/comment/${parameters.commentId}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: CommentSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns the notification subscription status of the user making the request. Use this method to determine
 * if the user is subscribed to a customer request's notifications.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 */
export async function getSubscriptionStatus(
  client: Client,
  parameters: GetSubscriptionStatus,
): Promise<RequestNotificationSubscription> {
  const config: SendRequestOptions<RequestNotificationSubscription> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/notification`,
    method: 'GET',
    schema: RequestNotificationSubscriptionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method subscribes the user to receiving notifications from a customer request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 */
export async function subscribe(client: Client, parameters: Subscribe): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/notification`,
    method: 'PUT',
  };

  return await client.sendRequest(config);
}

/**
 * This method unsubscribes the user from notifications from a customer request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 */
export async function unsubscribe(client: Client, parameters: Unsubscribe): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/notification`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * This method returns a list of all the participants on a customer request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 */
export async function getRequestParticipants(client: Client, parameters: GetRequestParticipants): Promise<PagedUser> {
  const config: SendRequestOptions<PagedUser> = {
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
 * This method adds participants to a customer request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to manage participants on the customer request.
 *
 * Note, participants can be added when creating a customer request using the
 * [request](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#api-request-post) resource, by defining
 * the participants in the `requestParticipants` field.
 */
export async function addRequestParticipants(client: Client, parameters: AddRequestParticipants): Promise<PagedUser> {
  const config: SendRequestOptions<PagedUser> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/participant`,
    method: 'POST',
    body: {
      accountIds: parameters.accountIds,
      usernames: parameters.usernames,
    },
    schema: PagedUserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method removes participants from a customer request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to manage participants on the customer request.
 */
export async function removeRequestParticipants(
  client: Client,
  parameters: RemoveRequestParticipants,
): Promise<PagedUser> {
  const config: SendRequestOptions<PagedUser> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/participant`,
    method: 'DELETE',
    body: {
      accountIds: parameters.accountIds,
      usernames: parameters.usernames,
    },
    schema: PagedUserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns all the SLA records on a customer request. A customer request can have zero or more SLAs. Each
 * SLA can have recordings for zero or more "completed cycles" and zero or 1 "ongoing cycle". Each cycle includes
 * information on when it started and stopped, and whether it breached the SLA goal.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 *
 * - Agent for the Service Desk containing the queried customer request, AND
 * - Browse Projects permission on the project containing the customer request, including any restrictions imposed by
 *   issue security schemes or custom permission schemes on the specific issue.
 */
export async function getSlaInformation(client: Client, parameters: GetSlaInformation): Promise<PagedSlaInformation> {
  const config: SendRequestOptions<PagedSlaInformation> = {
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
 * This method returns the details for an SLA on a customer request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 *
 * - Agent for the Service Desk containing the queried customer request, AND
 * - Browse Projects permission on the project containing the customer request, including any restrictions imposed by
 *   issue security schemes or custom permission schemes on the specific issue.
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
 * This method returns a list of all the statuses a customer Request has achieved. A status represents the state of an
 * issue in its workflow. An issue can have one active status only. The list returns the status history in chronological
 * order, most recent (current) status first.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 */
export async function getCustomerRequestStatus(
  client: Client,
  parameters: GetCustomerRequestStatus,
): Promise<PagedCustomerRequestStatus> {
  const config: SendRequestOptions<PagedCustomerRequestStatus> = {
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

/**
 * This method returns a list of transitions, the workflow processes that moves a customer request from one status to
 * another, that the user can perform on a request. Use this method to provide a user with a list if the actions they
 * can take on a customer request.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the customer request.
 */
export async function getCustomerTransitions(
  client: Client,
  parameters: GetCustomerTransitions,
): Promise<PagedCustomerTransition> {
  const config: SendRequestOptions<PagedCustomerTransition> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/transition`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedCustomerTransitionSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method performs a customer transition for a given request and transition. An optional comment can be included to
 * provide a reason for the transition.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: The user
 * must be able to view the request and have the Transition Issues permission. If a comment is passed the user must have
 * the Add Comments permission.
 */
export async function performCustomerTransition(client: Client, parameters: PerformCustomerTransition): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/transition`,
    method: 'POST',
    body: {
      additionalComment: parameters.additionalComment,
      id: parameters.id,
    },
  };

  return await client.sendRequest(config);
}
