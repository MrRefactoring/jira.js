import { type ClientConfig, type Client, type RequestOptions, createClient, type Buffer } from '#/core';
import * as assets from './api/assets';
import * as customer from './api/customer';
import * as info from './api/info';
import * as knowledgebase from './api/knowledgebase';
import * as organization from './api/organization';
import * as request from './api/request';
import * as servicedesk from './api/servicedesk';
import type {
  GetAssetsWorkspaces,
  GetInsightWorkspaces,
  CreateCustomer,
  CreateCustomerSkippingPermissionCheck,
  RevokePortalOnlyAccessForUser,
  GetArticles,
  ViewArticle,
  GetOrganizations,
  CreateOrganization,
  GetOrganization,
  DeleteOrganization,
  GetPropertiesKeys,
  GetProperty,
  SetProperty,
  DeleteProperty,
  GetUsersInOrganization,
  AddUsersToOrganization,
  RemoveUsersFromOrganization,
  GetServiceDeskOrganizations,
  AddOrganization,
  RemoveOrganization,
  GetCustomerRequests,
  CreateCustomerRequest,
  ValidateCustomerRequest,
  GetCustomerRequestByIdOrKey,
  GetApprovals,
  GetApprovalById,
  AnswerApproval,
  GetAttachmentsForRequest,
  CreateCommentWithAttachment,
  GetAttachmentContent,
  GetAttachmentThumbnail,
  GetRequestComments,
  CreateRequestComment,
  GetRequestCommentById,
  GetSubscriptionStatus,
  Subscribe,
  Unsubscribe,
  GetRequestParticipants,
  AddRequestParticipants,
  RemoveRequestParticipants,
  GetSlaInformation,
  GetSlaInformationById,
  GetCustomerRequestStatus,
  GetCustomerTransitions,
  PerformCustomerTransition,
  GetServiceDesks,
  GetServiceDeskById,
  AttachTemporaryFile,
  AddCustomers,
  AddCustomersSkippingPermissionCheck,
  GetServiceDeskArticles,
  GetQueues,
  GetQueue,
  GetIssuesInQueue,
  GetRequestTypes,
  GetRequestTypeById,
  GetRequestTypeFields,
  GetRequestTypeGroups,
} from './parameters';
import type {
  Page,
  AssetsWorkspace,
  InsightWorkspace,
  User,
  SoftwareInfo,
  Article,
  Organization,
  PropertyKeys,
  EntityProperty,
  CustomerRequest,
  RequestValidationResult,
  Approval,
  Attachment,
  AttachmentCreateResult,
  Comment,
  RequestNotificationSubscription,
  SlaInformation,
  CustomerRequestStatus,
  CustomerTransition,
  ServiceDesk,
  AttachTemporaryFile as AttachTemporaryFileModel,
  Queue,
  Issue,
  RequestType,
  CustomerRequestCreateMeta,
  RequestTypeGroup,
} from './models';

export function createServiceDeskClient(clientConfig: ClientConfig | Client) {
  const client = createClient(clientConfig);

  return {
    assets: {
      getAssetsWorkspaces: (
        parameters?: GetAssetsWorkspaces,
        options?: RequestOptions,
      ): Promise<Page<AssetsWorkspace>> => assets.getAssetsWorkspaces(client, parameters, options),
      /** @deprecated This endpoint is deprecated, please use /assets/workspace/. */
      getInsightWorkspaces: (
        parameters?: GetInsightWorkspaces,
        options?: RequestOptions,
      ): Promise<Page<InsightWorkspace>> => assets.getInsightWorkspaces(client, parameters, options),
    },
    customer: {
      createCustomer: (parameters: CreateCustomer, options?: RequestOptions): Promise<User> =>
        customer.createCustomer(client, parameters, options),
      createCustomerSkippingPermissionCheck: (
        parameters: CreateCustomerSkippingPermissionCheck,
        options?: RequestOptions,
      ): Promise<User> => customer.createCustomerSkippingPermissionCheck(client, parameters, options),
      revokePortalOnlyAccessForUser: (
        parameters: RevokePortalOnlyAccessForUser,
        options?: RequestOptions,
      ): Promise<void> => customer.revokePortalOnlyAccessForUser(client, parameters, options),
    },
    info: {
      getInfo: (options?: RequestOptions): Promise<SoftwareInfo> => info.getInfo(client, options),
    },
    knowledgebase: {
      getArticles: (parameters: GetArticles, options?: RequestOptions): Promise<Page<Article>> =>
        knowledgebase.getArticles(client, parameters, options),
      viewArticle: (parameters: ViewArticle, options?: RequestOptions): Promise<string> =>
        knowledgebase.viewArticle(client, parameters, options),
    },
    organization: {
      getOrganizations: (parameters?: GetOrganizations, options?: RequestOptions): Promise<Page<Organization>> =>
        organization.getOrganizations(client, parameters, options),
      createOrganization: (parameters: CreateOrganization, options?: RequestOptions): Promise<Organization> =>
        organization.createOrganization(client, parameters, options),
      getOrganization: (parameters: GetOrganization, options?: RequestOptions): Promise<Organization> =>
        organization.getOrganization(client, parameters, options),
      deleteOrganization: (parameters: DeleteOrganization, options?: RequestOptions): Promise<void> =>
        organization.deleteOrganization(client, parameters, options),
      getPropertiesKeys: (parameters: GetPropertiesKeys, options?: RequestOptions): Promise<PropertyKeys> =>
        organization.getPropertiesKeys(client, parameters, options),
      getProperty: (parameters: GetProperty, options?: RequestOptions): Promise<EntityProperty> =>
        organization.getProperty(client, parameters, options),
      setProperty: (parameters: SetProperty, options?: RequestOptions): Promise<void> =>
        organization.setProperty(client, parameters, options),
      deleteProperty: (parameters: DeleteProperty, options?: RequestOptions): Promise<void> =>
        organization.deleteProperty(client, parameters, options),
      getUsersInOrganization: (parameters: GetUsersInOrganization, options?: RequestOptions): Promise<Page<User>> =>
        organization.getUsersInOrganization(client, parameters, options),
      addUsersToOrganization: (parameters: AddUsersToOrganization, options?: RequestOptions): Promise<void> =>
        organization.addUsersToOrganization(client, parameters, options),
      removeUsersFromOrganization: (parameters: RemoveUsersFromOrganization, options?: RequestOptions): Promise<void> =>
        organization.removeUsersFromOrganization(client, parameters, options),
      getServiceDeskOrganizations: (
        parameters: GetServiceDeskOrganizations,
        options?: RequestOptions,
      ): Promise<Page<Organization>> => organization.getServiceDeskOrganizations(client, parameters, options),
      addOrganization: (parameters: AddOrganization, options?: RequestOptions): Promise<void> =>
        organization.addOrganization(client, parameters, options),
      removeOrganization: (parameters: RemoveOrganization, options?: RequestOptions): Promise<void> =>
        organization.removeOrganization(client, parameters, options),
    },
    request: {
      getCustomerRequests: (
        parameters?: GetCustomerRequests,
        options?: RequestOptions,
      ): Promise<Page<CustomerRequest>> => request.getCustomerRequests(client, parameters, options),
      createCustomerRequest: (parameters: CreateCustomerRequest, options?: RequestOptions): Promise<CustomerRequest> =>
        request.createCustomerRequest(client, parameters, options),
      validateCustomerRequest: (
        parameters: ValidateCustomerRequest,
        options?: RequestOptions,
      ): Promise<RequestValidationResult> => request.validateCustomerRequest(client, parameters, options),
      getCustomerRequestByIdOrKey: (
        parameters: GetCustomerRequestByIdOrKey,
        options?: RequestOptions,
      ): Promise<CustomerRequest> => request.getCustomerRequestByIdOrKey(client, parameters, options),
      getApprovals: (parameters: GetApprovals, options?: RequestOptions): Promise<Page<Approval>> =>
        request.getApprovals(client, parameters, options),
      getApprovalById: (parameters: GetApprovalById, options?: RequestOptions): Promise<Approval> =>
        request.getApprovalById(client, parameters, options),
      answerApproval: (parameters: AnswerApproval, options?: RequestOptions): Promise<Approval> =>
        request.answerApproval(client, parameters, options),
      getAttachmentsForRequest: (
        parameters: GetAttachmentsForRequest,
        options?: RequestOptions,
      ): Promise<Page<Attachment>> => request.getAttachmentsForRequest(client, parameters, options),
      createCommentWithAttachment: (
        parameters: CreateCommentWithAttachment,
        options?: RequestOptions,
      ): Promise<AttachmentCreateResult> => request.createCommentWithAttachment(client, parameters, options),
      getAttachmentContent: (parameters: GetAttachmentContent, options?: RequestOptions): Promise<Buffer> =>
        request.getAttachmentContent(client, parameters, options),
      getAttachmentThumbnail: (parameters: GetAttachmentThumbnail, options?: RequestOptions): Promise<Buffer> =>
        request.getAttachmentThumbnail(client, parameters, options),
      getRequestComments: (parameters: GetRequestComments, options?: RequestOptions): Promise<Page<Comment>> =>
        request.getRequestComments(client, parameters, options),
      createRequestComment: (parameters: CreateRequestComment, options?: RequestOptions): Promise<Comment> =>
        request.createRequestComment(client, parameters, options),
      getRequestCommentById: (parameters: GetRequestCommentById, options?: RequestOptions): Promise<Comment> =>
        request.getRequestCommentById(client, parameters, options),
      getSubscriptionStatus: (
        parameters: GetSubscriptionStatus,
        options?: RequestOptions,
      ): Promise<RequestNotificationSubscription> => request.getSubscriptionStatus(client, parameters, options),
      subscribe: (parameters: Subscribe, options?: RequestOptions): Promise<void> =>
        request.subscribe(client, parameters, options),
      unsubscribe: (parameters: Unsubscribe, options?: RequestOptions): Promise<void> =>
        request.unsubscribe(client, parameters, options),
      getRequestParticipants: (parameters: GetRequestParticipants, options?: RequestOptions): Promise<Page<User>> =>
        request.getRequestParticipants(client, parameters, options),
      addRequestParticipants: (parameters: AddRequestParticipants, options?: RequestOptions): Promise<Page<User>> =>
        request.addRequestParticipants(client, parameters, options),
      removeRequestParticipants: (
        parameters: RemoveRequestParticipants,
        options?: RequestOptions,
      ): Promise<Page<User>> => request.removeRequestParticipants(client, parameters, options),
      getSlaInformation: (parameters: GetSlaInformation, options?: RequestOptions): Promise<Page<SlaInformation>> =>
        request.getSlaInformation(client, parameters, options),
      getSlaInformationById: (parameters: GetSlaInformationById, options?: RequestOptions): Promise<SlaInformation> =>
        request.getSlaInformationById(client, parameters, options),
      getCustomerRequestStatus: (
        parameters: GetCustomerRequestStatus,
        options?: RequestOptions,
      ): Promise<Page<CustomerRequestStatus>> => request.getCustomerRequestStatus(client, parameters, options),
      getCustomerTransitions: (
        parameters: GetCustomerTransitions,
        options?: RequestOptions,
      ): Promise<Page<CustomerTransition>> => request.getCustomerTransitions(client, parameters, options),
      performCustomerTransition: (parameters: PerformCustomerTransition, options?: RequestOptions): Promise<void> =>
        request.performCustomerTransition(client, parameters, options),
    },
    servicedesk: {
      getServiceDesks: (parameters?: GetServiceDesks, options?: RequestOptions): Promise<Page<ServiceDesk>> =>
        servicedesk.getServiceDesks(client, parameters, options),
      getServiceDeskById: (parameters: GetServiceDeskById, options?: RequestOptions): Promise<ServiceDesk> =>
        servicedesk.getServiceDeskById(client, parameters, options),
      attachTemporaryFile: (
        parameters: AttachTemporaryFile,
        options?: RequestOptions,
      ): Promise<AttachTemporaryFileModel> => servicedesk.attachTemporaryFile(client, parameters, options),
      addCustomers: (parameters: AddCustomers, options?: RequestOptions): Promise<void> =>
        servicedesk.addCustomers(client, parameters, options),
      addCustomersSkippingPermissionCheck: (
        parameters: AddCustomersSkippingPermissionCheck,
        options?: RequestOptions,
      ): Promise<void> => servicedesk.addCustomersSkippingPermissionCheck(client, parameters, options),
      getServiceDeskArticles: (parameters: GetServiceDeskArticles, options?: RequestOptions): Promise<Page<Article>> =>
        servicedesk.getServiceDeskArticles(client, parameters, options),
      getQueues: (parameters: GetQueues, options?: RequestOptions): Promise<Page<Queue>> =>
        servicedesk.getQueues(client, parameters, options),
      getQueue: (parameters: GetQueue, options?: RequestOptions): Promise<Queue> =>
        servicedesk.getQueue(client, parameters, options),
      getIssuesInQueue: (parameters: GetIssuesInQueue, options?: RequestOptions): Promise<Page<Issue>> =>
        servicedesk.getIssuesInQueue(client, parameters, options),
      getRequestTypes: (parameters: GetRequestTypes, options?: RequestOptions): Promise<Page<RequestType>> =>
        servicedesk.getRequestTypes(client, parameters, options),
      getRequestTypeById: (parameters: GetRequestTypeById, options?: RequestOptions): Promise<RequestType> =>
        servicedesk.getRequestTypeById(client, parameters, options),
      getRequestTypeFields: (
        parameters: GetRequestTypeFields,
        options?: RequestOptions,
      ): Promise<CustomerRequestCreateMeta> => servicedesk.getRequestTypeFields(client, parameters, options),
      getRequestTypeGroups: (
        parameters: GetRequestTypeGroups,
        options?: RequestOptions,
      ): Promise<Page<RequestTypeGroup>> => servicedesk.getRequestTypeGroups(client, parameters, options),
    },
  };
}

export type ServiceDeskClient = ReturnType<typeof createServiceDeskClient>;
