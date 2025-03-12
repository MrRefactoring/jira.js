import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class Request {
  constructor(private client: Client) {}

  /**
   * This method returns all customer requests for the user executing the query.
   *
   * The returned customer requests are ordered chronologically by the latest activity on each request. For example, the
   * latest status transition or comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the specified service desk.
   *
   * **Response limitations**: For customers, the list returned will include request they created (or were created on
   * their behalf) or are participating in only.
   */
  async getCustomerRequests<T = Models.PagedCustomerRequest>(
    parameters: Parameters.GetCustomerRequests | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns all customer requests for the user executing the query.
   *
   * The returned customer requests are ordered chronologically by the latest activity on each request. For example, the
   * latest status transition or comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the specified service desk.
   *
   * **Response limitations**: For customers, the list returned will include request they created (or were created on
   * their behalf) or are participating in only.
   */
  async getCustomerRequests<T = Models.PagedCustomerRequest>(
    parameters?: Parameters.GetCustomerRequests,
    callback?: never,
  ): Promise<T>;
  async getCustomerRequests<T = Models.PagedCustomerRequest>(
    parameters?: Parameters.GetCustomerRequests,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/servicedeskapi/request',
      method: 'GET',
      params: {
        searchTerm: parameters?.searchTerm,
        requestStatus: parameters?.requestStatus,
        approvalStatus: parameters?.approvalStatus,
        organizationId: parameters?.organizationId,
        serviceDeskId: parameters?.serviceDeskId,
        requestTypeId: parameters?.requestTypeId,
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method creates a customer request in a service desk.
   *
   * The JSON request must include the service desk and customer request type, as well as any fields that are required
   * for the request type. A list of the fields required by a customer request type can be obtained using
   * [servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/field](#api-servicedesk-serviceDeskId-requesttype-requestTypeId-field-get).
   *
   * The fields required for a customer request type depend on the user's permissions:
   *
   * - `raiseOnBehalfOf` is not available to Users who have the customer permission only.
   * - `requestParticipants` is not available to Users who have the customer permission only or if the feature is turned
   *   off for customers.
   *
   * `requestFieldValues` is a map of Jira field IDs and their values. See [Field input formats](#fieldformats), for
   * details of each field's JSON semantics and the values they can take.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to create requests in the specified service desk.
   */
  async createCustomerRequest<T = Models.CustomerRequest>(
    parameters: Parameters.CreateCustomerRequest | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method creates a customer request in a service desk.
   *
   * The JSON request must include the service desk and customer request type, as well as any fields that are required
   * for the request type. A list of the fields required by a customer request type can be obtained using
   * [servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/field](#api-servicedesk-serviceDeskId-requesttype-requestTypeId-field-get).
   *
   * The fields required for a customer request type depend on the user's permissions:
   *
   * - `raiseOnBehalfOf` is not available to Users who have the customer permission only.
   * - `requestParticipants` is not available to Users who have the customer permission only or if the feature is turned
   *   off for customers.
   *
   * `requestFieldValues` is a map of Jira field IDs and their values. See [Field input formats](#fieldformats), for
   * details of each field's JSON semantics and the values they can take.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to create requests in the specified service desk.
   */
  async createCustomerRequest<T = Models.CustomerRequest>(
    parameters?: Parameters.CreateCustomerRequest,
    callback?: never,
  ): Promise<T>;
  async createCustomerRequest<T = Models.CustomerRequest>(
    parameters?: Parameters.CreateCustomerRequest,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/servicedeskapi/request',
      method: 'POST',
      data: {
        serviceDeskId: parameters?.serviceDeskId,
        requestTypeId: parameters?.requestTypeId,
        requestFieldValues: parameters?.requestFieldValues,
        requestParticipants: parameters?.requestParticipants,
        raiseOnBehalfOf: parameters?.raiseOnBehalfOf,
        channel: parameters?.channel,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the specified service desk.
   *
   * **Response limitations**: For customers, only a request they created, was created on their behalf, or they are
   * participating in will be returned.
   */
  async getCustomerRequestByIdOrKey<T = Models.CustomerRequest>(
    parameters: Parameters.GetCustomerRequestByIdOrKey,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the specified service desk.
   *
   * **Response limitations**: For customers, only a request they created, was created on their behalf, or they are
   * participating in will be returned.
   */
  async getCustomerRequestByIdOrKey<T = Models.CustomerRequest>(
    parameters: Parameters.GetCustomerRequestByIdOrKey,
    callback?: never,
  ): Promise<T>;
  async getCustomerRequestByIdOrKey<T = Models.CustomerRequest>(
    parameters: Parameters.GetCustomerRequestByIdOrKey,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns all approvals on a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getApprovals<T = Models.PagedApproval>(
    parameters: Parameters.GetApprovals,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns all approvals on a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getApprovals<T = Models.PagedApproval>(parameters: Parameters.GetApprovals, callback?: never): Promise<T>;
  async getApprovals<T = Models.PagedApproval>(
    parameters: Parameters.GetApprovals,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/approval`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns an approval. Use this method to determine the status of an approval and the list of approvers.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getApprovalById<T = Models.Approval>(
    parameters: Parameters.GetApprovalById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns an approval. Use this method to determine the status of an approval and the list of approvers.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getApprovalById<T = Models.Approval>(parameters: Parameters.GetApprovalById, callback?: never): Promise<T>;
  async getApprovalById<T = Models.Approval>(
    parameters: Parameters.GetApprovalById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/approval/${parameters.approvalId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method enables a user to **Approve** or **Decline** an approval on a customer request. The approval is assumed
   * to be owned by the user making the call.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * is assigned to the approval request.
   */
  async answerApproval<T = Models.Approval>(
    parameters: Parameters.AnswerApproval,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method enables a user to **Approve** or **Decline** an approval on a customer request. The approval is assumed
   * to be owned by the user making the call.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * is assigned to the approval request.
   */
  async answerApproval<T = Models.Approval>(parameters: Parameters.AnswerApproval, callback?: never): Promise<T>;
  async answerApproval<T = Models.Approval>(
    parameters: Parameters.AnswerApproval,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/approval/${parameters.approvalId}`,
      method: 'POST',
      data: {
        decision: parameters.decision,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns all the attachments for a customer requests.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   *
   * **Response limitations**: Customers will only get a list of public attachments.
   */
  async getAttachmentsForRequest<T = Models.PagedAttachment>(
    parameters: Parameters.GetAttachmentsForRequest,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns all the attachments for a customer requests.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   *
   * **Response limitations**: Customers will only get a list of public attachments.
   */
  async getAttachmentsForRequest<T = Models.PagedAttachment>(
    parameters: Parameters.GetAttachmentsForRequest,
    callback?: never,
  ): Promise<T>;
  async getAttachmentsForRequest<T = Models.PagedAttachment>(
    parameters: Parameters.GetAttachmentsForRequest,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/attachment`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method adds one or more temporary files (attached to the request's service desk using
   * [servicedesk/{serviceDeskId}/attachTemporaryFile](#api-servicedesk-serviceDeskId-attachTemporaryFile-post)) as
   * attachments to a customer request and set the attachment visibility using the `public` flag. Also, it is possible
   * to include a comment with the attachments.
   *
   * To get a list of attachments for a comment on the request use
   * [servicedeskapi/request/{issueIdOrKey}/comment/{commentId}/attachment](#api-request-issueIdOrKey-comment-commentId-attachment-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to add an attachment.
   *
   * **Request limitations**: Customers can set attachments to public visibility only.
   */
  async createAttachment<T = Models.AttachmentCreateResult>(
    parameters: Parameters.CreateAttachment,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method adds one or more temporary files (attached to the request's service desk using
   * [servicedesk/{serviceDeskId}/attachTemporaryFile](#api-servicedesk-serviceDeskId-attachTemporaryFile-post)) as
   * attachments to a customer request and set the attachment visibility using the `public` flag. Also, it is possible
   * to include a comment with the attachments.
   *
   * To get a list of attachments for a comment on the request use
   * [servicedeskapi/request/{issueIdOrKey}/comment/{commentId}/attachment](#api-request-issueIdOrKey-comment-commentId-attachment-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to add an attachment.
   *
   * **Request limitations**: Customers can set attachments to public visibility only.
   */
  async createAttachment<T = Models.AttachmentCreateResult>(
    parameters: Parameters.CreateAttachment,
    callback?: never,
  ): Promise<T>;
  async createAttachment<T = Models.AttachmentCreateResult>(
    parameters: Parameters.CreateAttachment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/attachment`,
      method: 'POST',
      data: {
        temporaryAttachmentIds: parameters.temporaryAttachmentIds,
        additionalComment: parameters.additionalComment,
        public: parameters.public,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the contents of an attachment.
   *
   * To return a thumbnail of the attachment, use
   * [servicedeskapi/request/{issueIdOrKey}/attachment/{attachmentId}/thumbnail](#api-rest-servicedeskapi-request-issueidorkey-attachment-attachmentid-thumbnail-get).
   *
   * **[Permissions](#permissions) required:** For the issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getAttachmentContent<T = unknown>(
    parameters: Parameters.GetAttachmentContent,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the contents of an attachment.
   *
   * To return a thumbnail of the attachment, use
   * [servicedeskapi/request/{issueIdOrKey}/attachment/{attachmentId}/thumbnail](#api-rest-servicedeskapi-request-issueidorkey-attachment-attachmentid-thumbnail-get).
   *
   * **[Permissions](#permissions) required:** For the issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getAttachmentContent<T = unknown>(parameters: Parameters.GetAttachmentContent, callback?: never): Promise<T>;
  async getAttachmentContent<T = unknown>(
    parameters: Parameters.GetAttachmentContent,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/attachment/${parameters.attachmentId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the thumbnail of an attachment.
   *
   * To return the attachment contents, use
   * [servicedeskapi/request/{issueIdOrKey}/attachment/{attachmentId}](#api-rest-servicedeskapi-request-issueidorkey-attachment-attachmentid-get).
   *
   * **[Permissions](#permissions) required:** For the issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getAttachmentThumbnail<T = unknown>(
    parameters: Parameters.GetAttachmentThumbnail,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the thumbnail of an attachment.
   *
   * To return the attachment contents, use
   * [servicedeskapi/request/{issueIdOrKey}/attachment/{attachmentId}](#api-rest-servicedeskapi-request-issueidorkey-attachment-attachmentid-get).
   *
   * **[Permissions](#permissions) required:** For the issue containing the attachment:
   *
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *   in.
   * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *   to view the issue.
   */
  async getAttachmentThumbnail<T = unknown>(
    parameters: Parameters.GetAttachmentThumbnail,
    callback?: never,
  ): Promise<T>;
  async getAttachmentThumbnail<T = unknown>(
    parameters: Parameters.GetAttachmentThumbnail,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/attachment/${parameters.attachmentId}/thumbnail`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns all comments on a customer request. No permissions error is provided if, for example, the user
   * doesn't have access to the service desk or request, the method simply returns an empty response.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   *
   * **Response limitations**: Customers are returned public comments only.
   */
  async getRequestComments<T = Models.PagedComment>(
    parameters: Parameters.GetRequestComments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns all comments on a customer request. No permissions error is provided if, for example, the user
   * doesn't have access to the service desk or request, the method simply returns an empty response.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   *
   * **Response limitations**: Customers are returned public comments only.
   */
  async getRequestComments<T = Models.PagedComment>(
    parameters: Parameters.GetRequestComments,
    callback?: never,
  ): Promise<T>;
  async getRequestComments<T = Models.PagedComment>(
    parameters: Parameters.GetRequestComments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/comment`,
      method: 'GET',
      params: {
        public: parameters.public,
        internal: parameters.internal,
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method creates a public or private (internal) comment on a customer request, with the comment visibility set
   * by `public`. The user recorded as the author of the comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * has Add Comments permission.
   *
   * **Request limitations**: Customers can set comments to public visibility only.
   */
  async createRequestComment<T = Models.Comment>(
    parameters: Parameters.CreateRequestComment,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method creates a public or private (internal) comment on a customer request, with the comment visibility set
   * by `public`. The user recorded as the author of the comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * has Add Comments permission.
   *
   * **Request limitations**: Customers can set comments to public visibility only.
   */
  async createRequestComment<T = Models.Comment>(
    parameters: Parameters.CreateRequestComment,
    callback?: never,
  ): Promise<T>;
  async createRequestComment<T = Models.Comment>(
    parameters: Parameters.CreateRequestComment,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/comment`,
      method: 'POST',
      data: {
        body: parameters.body,
        public: parameters.public,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns details of a customer request's comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   *
   * **Response limitations**: Customers can only view public comments on requests where they are the reporter or a
   * participant whereas agents can see both internal and public comments.
   */
  async getRequestCommentById<T = Models.Comment>(
    parameters: Parameters.GetRequestCommentById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns details of a customer request's comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   *
   * **Response limitations**: Customers can only view public comments on requests where they are the reporter or a
   * participant whereas agents can see both internal and public comments.
   */
  async getRequestCommentById<T = Models.Comment>(
    parameters: Parameters.GetRequestCommentById,
    callback?: never,
  ): Promise<T>;
  async getRequestCommentById<T = Models.Comment>(
    parameters: Parameters.GetRequestCommentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/comment/${parameters.commentId}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns the attachments referenced in a comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   *
   * **Response limitations**: Customers can only view public comments, and retrieve their attachments, on requests
   * where they are the reporter or a participant whereas agents can see both internal and public comments.
   */
  async getCommentAttachments<T = Models.PagedAttachment>(
    parameters: Parameters.GetCommentAttachments,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns the attachments referenced in a comment.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   *
   * **Response limitations**: Customers can only view public comments, and retrieve their attachments, on requests
   * where they are the reporter or a participant whereas agents can see both internal and public comments.
   */
  async getCommentAttachments<T = Models.PagedAttachment>(
    parameters: Parameters.GetCommentAttachments,
    callback?: never,
  ): Promise<T>;
  async getCommentAttachments<T = Models.PagedAttachment>(
    parameters: Parameters.GetCommentAttachments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/comment/${parameters.commentId}/attachment`,
      method: 'GET',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns the notification subscription status of the user making the request. Use this method to
   * determine if the user is subscribed to a customer request's notifications.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getSubscriptionStatus<T = Models.RequestNotificationSubscription>(
    parameters: Parameters.GetSubscriptionStatus,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns the notification subscription status of the user making the request. Use this method to
   * determine if the user is subscribed to a customer request's notifications.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getSubscriptionStatus<T = Models.RequestNotificationSubscription>(
    parameters: Parameters.GetSubscriptionStatus,
    callback?: never,
  ): Promise<T>;
  async getSubscriptionStatus<T = Models.RequestNotificationSubscription>(
    parameters: Parameters.GetSubscriptionStatus,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/notification`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method subscribes the user to receiving notifications from a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async subscribe<T = void>(parameters: Parameters.Subscribe, callback: Callback<T>): Promise<void>;
  /**
   * This method subscribes the user to receiving notifications from a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async subscribe<T = void>(parameters: Parameters.Subscribe, callback?: never): Promise<T>;
  async subscribe<T = void>(parameters: Parameters.Subscribe, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/notification`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method unsubscribes the user from notifications from a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async unsubscribe<T = void>(parameters: Parameters.Unsubscribe, callback: Callback<T>): Promise<void>;
  /**
   * This method unsubscribes the user from notifications from a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async unsubscribe<T = void>(parameters: Parameters.Unsubscribe, callback?: never): Promise<T>;
  async unsubscribe<T = void>(parameters: Parameters.Unsubscribe, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/notification`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns a list of all the participants on a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getRequestParticipants<T = Models.PagedUser>(
    parameters: Parameters.GetRequestParticipants,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns a list of all the participants on a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getRequestParticipants<T = Models.PagedUser>(
    parameters: Parameters.GetRequestParticipants,
    callback?: never,
  ): Promise<T>;
  async getRequestParticipants<T = Models.PagedUser>(
    parameters: Parameters.GetRequestParticipants,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/participant`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method adds participants to a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to manage participants on the customer request.
   *
   * Note, participants can be added when creating a customer request using the
   * [request](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-request/) resource, by defining
   * the participants in the `requestParticipants` field.
   */
  async addRequestParticipants<T = Models.PagedUser>(
    parameters: Parameters.AddRequestParticipants,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method adds participants to a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to manage participants on the customer request.
   *
   * Note, participants can be added when creating a customer request using the
   * [request](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-request/) resource, by defining
   * the participants in the `requestParticipants` field.
   */
  async addRequestParticipants<T = Models.PagedUser>(
    parameters: Parameters.AddRequestParticipants,
    callback?: never,
  ): Promise<T>;
  async addRequestParticipants<T = Models.PagedUser>(
    parameters: Parameters.AddRequestParticipants,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/participant`,
      method: 'POST',
      data: {
        usernames: parameters.usernames,
        accountIds: parameters.accountIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method removes participants from a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to manage participants on the customer request.
   */
  async removeRequestParticipants<T = Models.PagedUser>(
    parameters: Parameters.RemoveRequestParticipants,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method removes participants from a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to manage participants on the customer request.
   */
  async removeRequestParticipants<T = Models.PagedUser>(
    parameters: Parameters.RemoveRequestParticipants,
    callback?: never,
  ): Promise<T>;
  async removeRequestParticipants<T = Models.PagedUser>(
    parameters: Parameters.RemoveRequestParticipants,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/participant`,
      method: 'DELETE',
      data: {
        usernames: parameters.usernames,
        accountIds: parameters.accountIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns all the SLA records on a customer request. A customer request can have zero or more SLAs. Each
   * SLA can have recordings for zero or more "completed cycles" and zero or 1 "ongoing cycle". Each cycle includes
   * information on when it started and stopped, and whether it breached the SLA goal.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Agent
   * for the Service Desk containing the queried customer request.
   */
  async getSlaInformation<T = Models.PagedSlaInformation>(
    parameters: Parameters.GetSlaInformation,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns all the SLA records on a customer request. A customer request can have zero or more SLAs. Each
   * SLA can have recordings for zero or more "completed cycles" and zero or 1 "ongoing cycle". Each cycle includes
   * information on when it started and stopped, and whether it breached the SLA goal.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Agent
   * for the Service Desk containing the queried customer request.
   */
  async getSlaInformation<T = Models.PagedSlaInformation>(
    parameters: Parameters.GetSlaInformation,
    callback?: never,
  ): Promise<T>;
  async getSlaInformation<T = Models.PagedSlaInformation>(
    parameters: Parameters.GetSlaInformation,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/sla`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns the details for an SLA on a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Agent
   * for the Service Desk containing the queried customer request.
   */
  async getSlaInformationById<T = Models.SlaInformation>(
    parameters: Parameters.GetSlaInformationById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns the details for an SLA on a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Agent
   * for the Service Desk containing the queried customer request.
   */
  async getSlaInformationById<T = Models.SlaInformation>(
    parameters: Parameters.GetSlaInformationById,
    callback?: never,
  ): Promise<T>;
  async getSlaInformationById<T = Models.SlaInformation>(
    parameters: Parameters.GetSlaInformationById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/sla/${parameters.slaMetricId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns a list of all the statuses a customer Request has achieved. A status represents the state of an
   * issue in its workflow. An issue can have one active status only. The list returns the status history in
   * chronological order, most recent (current) status first.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getCustomerRequestStatus<T = Models.PagedCustomerRequestStatus>(
    parameters: Parameters.GetCustomerRequestStatus,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns a list of all the statuses a customer Request has achieved. A status represents the state of an
   * issue in its workflow. An issue can have one active status only. The list returns the status history in
   * chronological order, most recent (current) status first.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getCustomerRequestStatus<T = Models.PagedCustomerRequestStatus>(
    parameters: Parameters.GetCustomerRequestStatus,
    callback?: never,
  ): Promise<T>;
  async getCustomerRequestStatus<T = Models.PagedCustomerRequestStatus>(
    parameters: Parameters.GetCustomerRequestStatus,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/status`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns a list of transitions, the workflow processes that moves a customer request from one status to
   * another, that the user can perform on a request. Use this method to provide a user with a list if the actions they
   * can take on a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getCustomerTransitions<T = Models.PagedCustomerTransition>(
    parameters: Parameters.GetCustomerTransitions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns a list of transitions, the workflow processes that moves a customer request from one status to
   * another, that the user can perform on a request. Use this method to provide a user with a list if the actions they
   * can take on a customer request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the customer request.
   */
  async getCustomerTransitions<T = Models.PagedCustomerTransition>(
    parameters: Parameters.GetCustomerTransitions,
    callback?: never,
  ): Promise<T>;
  async getCustomerTransitions<T = Models.PagedCustomerTransition>(
    parameters: Parameters.GetCustomerTransitions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/transition`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method performs a customer transition for a given request and transition. An optional comment can be included
   * to provide a reason for the transition.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: The
   * user must be able to view the request and have the Transition Issues permission. If a comment is passed the user
   * must have the Add Comments permission.
   */
  async performCustomerTransition<T = void>(
    parameters: Parameters.PerformCustomerTransition,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method performs a customer transition for a given request and transition. An optional comment can be included
   * to provide a reason for the transition.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: The
   * user must be able to view the request and have the Transition Issues permission. If a comment is passed the user
   * must have the Add Comments permission.
   */
  async performCustomerTransition<T = void>(
    parameters: Parameters.PerformCustomerTransition,
    callback?: never,
  ): Promise<T>;
  async performCustomerTransition<T = void>(
    parameters: Parameters.PerformCustomerTransition,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/transition`,
      method: 'POST',
      data: {
        id: parameters.id,
        additionalComment: parameters.additionalComment,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method retrieves a feedback of a request using it's `requestKey` or `requestId`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * has view request permissions.
   */
  async getFeedback<T = Models.CsatFeedbackFull>(
    parameters: Parameters.GetFeedback,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method retrieves a feedback of a request using it's `requestKey` or `requestId`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * has view request permissions.
   */
  async getFeedback<T = Models.CsatFeedbackFull>(parameters: Parameters.GetFeedback, callback?: never): Promise<T>;
  async getFeedback<T = Models.CsatFeedbackFull>(
    parameters: Parameters.GetFeedback,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.requestIdOrKey}/feedback`,
      method: 'GET',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method adds a feedback on a request using it's `requestKey` or `requestId`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * must be the reporter or an Atlassian Connect app.
   */
  async postFeedback<T = Models.CsatFeedbackFull>(
    parameters: Parameters.PostFeedback,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method adds a feedback on a request using it's `requestKey` or `requestId`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * must be the reporter or an Atlassian Connect app.
   */
  async postFeedback<T = Models.CsatFeedbackFull>(parameters: Parameters.PostFeedback, callback?: never): Promise<T>;
  async postFeedback<T = Models.CsatFeedbackFull>(
    parameters: Parameters.PostFeedback,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.requestIdOrKey}/feedback`,
      method: 'POST',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
      data: {
        type: parameters.type,
        rating: parameters.rating,
        comment: parameters.comment,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method deletes the feedback of request using it's `requestKey` or `requestId`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * must be the reporter or an Atlassian Connect app.
   */
  async deleteFeedback<T = void>(parameters: Parameters.DeleteFeedback, callback: Callback<T>): Promise<void>;
  /**
   * This method deletes the feedback of request using it's `requestKey` or `requestId`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * must be the reporter or an Atlassian Connect app.
   */
  async deleteFeedback<T = void>(parameters: Parameters.DeleteFeedback, callback?: never): Promise<T>;
  async deleteFeedback<T = void>(parameters: Parameters.DeleteFeedback, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/request/${parameters.requestIdOrKey}/feedback`,
      method: 'DELETE',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
