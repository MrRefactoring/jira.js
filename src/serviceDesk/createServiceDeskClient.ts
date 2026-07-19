import { type ClientConfig, type Client, createClient } from '#/core';
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
  PagedAssetsWorkspace,
  PagedInsightWorkspace,
  User,
  SoftwareInfo,
  PagedArticle,
  PagedOrganization,
  Organization,
  PropertyKeys,
  EntityProperty,
  PagedUser,
  PagedCustomerRequest,
  CustomerRequest,
  PagedApproval,
  Approval,
  PagedAttachment,
  AttachmentCreateResult,
  PagedComment,
  Comment,
  RequestNotificationSubscription,
  PagedSlaInformation,
  SlaInformation,
  PagedCustomerRequestStatus,
  PagedCustomerTransition,
  PagedServiceDesk,
  ServiceDesk,
  PagedQueue,
  Queue,
  PagedIssue,
  PagedRequestType,
  RequestType,
  CustomerRequestCreateMeta,
  PagedRequestTypeGroup,
} from './models';

export function createServiceDeskClient(clientConfig: ClientConfig | Client) {
  const client = createClient(clientConfig);

  return {
    assets: {
      getAssetsWorkspaces: (parameters?: GetAssetsWorkspaces): Promise<PagedAssetsWorkspace> =>
        assets.getAssetsWorkspaces(client, parameters),
      getInsightWorkspaces: (parameters?: GetInsightWorkspaces): Promise<PagedInsightWorkspace> =>
        assets.getInsightWorkspaces(client, parameters),
    },
    customer: {
      createCustomer: (parameters: CreateCustomer): Promise<User> => customer.createCustomer(client, parameters),
      createCustomerSkippingPermissionCheck: (parameters: CreateCustomerSkippingPermissionCheck): Promise<User> =>
        customer.createCustomerSkippingPermissionCheck(client, parameters),
      revokePortalOnlyAccessForUser: (parameters: RevokePortalOnlyAccessForUser): Promise<void> =>
        customer.revokePortalOnlyAccessForUser(client, parameters),
    },
    info: {
      getInfo: (): Promise<SoftwareInfo> => info.getInfo(client),
    },
    knowledgebase: {
      getArticles: (parameters: GetArticles): Promise<PagedArticle> => knowledgebase.getArticles(client, parameters),
      viewArticle: (parameters: ViewArticle): Promise<string> => knowledgebase.viewArticle(client, parameters),
    },
    organization: {
      getOrganizations: (parameters?: GetOrganizations): Promise<PagedOrganization> =>
        organization.getOrganizations(client, parameters),
      createOrganization: (parameters: CreateOrganization): Promise<Organization> =>
        organization.createOrganization(client, parameters),
      getOrganization: (parameters: GetOrganization): Promise<Organization> =>
        organization.getOrganization(client, parameters),
      deleteOrganization: (parameters: DeleteOrganization): Promise<void> =>
        organization.deleteOrganization(client, parameters),
      getPropertiesKeys: (parameters: GetPropertiesKeys): Promise<PropertyKeys> =>
        organization.getPropertiesKeys(client, parameters),
      getProperty: (parameters: GetProperty): Promise<EntityProperty> => organization.getProperty(client, parameters),
      setProperty: (parameters: SetProperty): Promise<unknown> => organization.setProperty(client, parameters),
      deleteProperty: (parameters: DeleteProperty): Promise<void> => organization.deleteProperty(client, parameters),
      getUsersInOrganization: (parameters: GetUsersInOrganization): Promise<PagedUser> =>
        organization.getUsersInOrganization(client, parameters),
      addUsersToOrganization: (parameters: AddUsersToOrganization): Promise<void> =>
        organization.addUsersToOrganization(client, parameters),
      removeUsersFromOrganization: (parameters: RemoveUsersFromOrganization): Promise<void> =>
        organization.removeUsersFromOrganization(client, parameters),
      getServiceDeskOrganizations: (parameters: GetServiceDeskOrganizations): Promise<PagedOrganization> =>
        organization.getServiceDeskOrganizations(client, parameters),
      addOrganization: (parameters: AddOrganization): Promise<void> => organization.addOrganization(client, parameters),
      removeOrganization: (parameters: RemoveOrganization): Promise<void> =>
        organization.removeOrganization(client, parameters),
    },
    request: {
      getCustomerRequests: (parameters?: GetCustomerRequests): Promise<PagedCustomerRequest> =>
        request.getCustomerRequests(client, parameters),
      createCustomerRequest: (parameters: CreateCustomerRequest): Promise<CustomerRequest> =>
        request.createCustomerRequest(client, parameters),
      getCustomerRequestByIdOrKey: (parameters: GetCustomerRequestByIdOrKey): Promise<CustomerRequest> =>
        request.getCustomerRequestByIdOrKey(client, parameters),
      getApprovals: (parameters: GetApprovals): Promise<PagedApproval> => request.getApprovals(client, parameters),
      getApprovalById: (parameters: GetApprovalById): Promise<Approval> => request.getApprovalById(client, parameters),
      answerApproval: (parameters: AnswerApproval): Promise<Approval> => request.answerApproval(client, parameters),
      getAttachmentsForRequest: (parameters: GetAttachmentsForRequest): Promise<PagedAttachment> =>
        request.getAttachmentsForRequest(client, parameters),
      createCommentWithAttachment: (parameters: CreateCommentWithAttachment): Promise<AttachmentCreateResult> =>
        request.createCommentWithAttachment(client, parameters),
      getAttachmentContent: (parameters: GetAttachmentContent): Promise<unknown> =>
        request.getAttachmentContent(client, parameters),
      getAttachmentThumbnail: (parameters: GetAttachmentThumbnail): Promise<unknown> =>
        request.getAttachmentThumbnail(client, parameters),
      getRequestComments: (parameters: GetRequestComments): Promise<PagedComment> =>
        request.getRequestComments(client, parameters),
      createRequestComment: (parameters: CreateRequestComment): Promise<Comment> =>
        request.createRequestComment(client, parameters),
      getRequestCommentById: (parameters: GetRequestCommentById): Promise<Comment> =>
        request.getRequestCommentById(client, parameters),
      getSubscriptionStatus: (parameters: GetSubscriptionStatus): Promise<RequestNotificationSubscription> =>
        request.getSubscriptionStatus(client, parameters),
      subscribe: (parameters: Subscribe): Promise<void> => request.subscribe(client, parameters),
      unsubscribe: (parameters: Unsubscribe): Promise<void> => request.unsubscribe(client, parameters),
      getRequestParticipants: (parameters: GetRequestParticipants): Promise<PagedUser> =>
        request.getRequestParticipants(client, parameters),
      addRequestParticipants: (parameters: AddRequestParticipants): Promise<PagedUser> =>
        request.addRequestParticipants(client, parameters),
      removeRequestParticipants: (parameters: RemoveRequestParticipants): Promise<PagedUser> =>
        request.removeRequestParticipants(client, parameters),
      getSlaInformation: (parameters: GetSlaInformation): Promise<PagedSlaInformation> =>
        request.getSlaInformation(client, parameters),
      getSlaInformationById: (parameters: GetSlaInformationById): Promise<SlaInformation> =>
        request.getSlaInformationById(client, parameters),
      getCustomerRequestStatus: (parameters: GetCustomerRequestStatus): Promise<PagedCustomerRequestStatus> =>
        request.getCustomerRequestStatus(client, parameters),
      getCustomerTransitions: (parameters: GetCustomerTransitions): Promise<PagedCustomerTransition> =>
        request.getCustomerTransitions(client, parameters),
      performCustomerTransition: (parameters: PerformCustomerTransition): Promise<void> =>
        request.performCustomerTransition(client, parameters),
    },
    servicedesk: {
      getServiceDesks: (parameters?: GetServiceDesks): Promise<PagedServiceDesk> =>
        servicedesk.getServiceDesks(client, parameters),
      getServiceDeskById: (parameters: GetServiceDeskById): Promise<ServiceDesk> =>
        servicedesk.getServiceDeskById(client, parameters),
      attachTemporaryFile: (parameters: AttachTemporaryFile): Promise<unknown> =>
        servicedesk.attachTemporaryFile(client, parameters),
      addCustomers: (parameters: AddCustomers): Promise<void> => servicedesk.addCustomers(client, parameters),
      addCustomersSkippingPermissionCheck: (parameters: AddCustomersSkippingPermissionCheck): Promise<void> =>
        servicedesk.addCustomersSkippingPermissionCheck(client, parameters),
      getServiceDeskArticles: (parameters: GetServiceDeskArticles): Promise<PagedArticle> =>
        servicedesk.getServiceDeskArticles(client, parameters),
      getQueues: (parameters: GetQueues): Promise<PagedQueue> => servicedesk.getQueues(client, parameters),
      getQueue: (parameters: GetQueue): Promise<Queue> => servicedesk.getQueue(client, parameters),
      getIssuesInQueue: (parameters: GetIssuesInQueue): Promise<PagedIssue> =>
        servicedesk.getIssuesInQueue(client, parameters),
      getRequestTypes: (parameters: GetRequestTypes): Promise<PagedRequestType> =>
        servicedesk.getRequestTypes(client, parameters),
      getRequestTypeById: (parameters: GetRequestTypeById): Promise<RequestType> =>
        servicedesk.getRequestTypeById(client, parameters),
      getRequestTypeFields: (parameters: GetRequestTypeFields): Promise<CustomerRequestCreateMeta> =>
        servicedesk.getRequestTypeFields(client, parameters),
      getRequestTypeGroups: (parameters: GetRequestTypeGroups): Promise<PagedRequestTypeGroup> =>
        servicedesk.getRequestTypeGroups(client, parameters),
    },
  };
}
export type ServiceDeskClient = ReturnType<typeof createServiceDeskClient>;
