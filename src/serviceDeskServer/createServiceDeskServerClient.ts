import { type ClientConfig, type Client, type RequestOptions, createClient } from '#/core';
import * as approvals from './api/approvals';
import * as requestAttachments from './api/requestAttachments';
import * as customerRequests from './api/customerRequests';
import * as customers from './api/customers';
import * as customerTransitions from './api/customerTransitions';
import * as organizations from './api/organizations';
import * as serviceDeskOrganizations from './api/serviceDeskOrganizations';
import * as portals from './api/portals';
import * as queues from './api/queues';
import * as requestTypes from './api/requestTypes';
import * as requestTypePermissions from './api/requestTypePermissions';
import * as serviceDesks from './api/serviceDesks';
import * as info from './api/info';
import * as queueSettings from './api/queueSettings';
import type {
  GetApprovalById,
  AnswerApproval,
  GetApprovalCommentConfig,
  GetApprovals,
  CreateAttachment,
  AttachTemporaryFile,
  GetRequestComments,
  CreateRequestComment,
  GetRequestCommentById,
  GetMyCustomerRequests,
  CreateCustomerRequest,
  GetCustomerRequestByIdOrKey,
  GetRequestParticipants,
  AddRequestParticipants,
  RemoveRequestParticipants,
  GetSlaInformation,
  GetSlaInformationById,
  GetCustomerRequestStatus,
  CreateCustomer,
  AddCustomers,
  GetCustomerTransitions,
  PerformCustomerTransition,
  GetUsersInOrganization,
  AddUsersToOrganization,
  RemoveUsersFromOrganization,
  PreviewCleanUpOrganizations,
  CleanUpOrganizations,
  GetOrganizations,
  CreateOrganization,
  GetOrganization,
  DeleteOrganization,
  GetServiceDeskOrganizations,
  AddOrganization,
  RemoveOrganization,
  GetPortal,
  GetPortalByProjectKey,
  GetPortals,
  GetQueues,
  CreateQueue,
  GetQueue,
  UpdateQueue,
  DeleteQueue,
  GetIssuesInQueue,
  ReorderQueues,
  GetRequestTypeFields,
  GetRequestTypeGroups,
  GetRequestTypes,
  CreateRequestType,
  UpdateRequestType,
  GetRequestTypeById,
  DeleteRequestType,
  GetPermissionsByRequestTypeId,
  UpsertRequestTypePermission,
  GetServiceDeskById,
  GetServiceDesks,
  GetQueueSettingsOnProject,
  SetShouldQueuesIncludeCountGlobally,
  SetShouldQueuesIncludeCountOnProject,
  SetShouldQueuesUseCountCacheGlobally,
  SetShouldQueuesUseCountCacheOnProject,
} from './parameters';
import type {
  Approval,
  ApprovalCommentConfig,
  Page,
  AttachmentCreateResult,
  CreateTemporaryWebAttachmentResult,
  Comment,
  CustomerRequest,
  User,
  SlaInformation,
  CustomerRequestStatus,
  CustomerTransition,
  CustomerOrganization,
  Organization,
  Portal,
  Queue,
  Issue,
  CustomerRequestCreateMeta,
  RequestTypeGroup,
  RequestType,
  RequestTypePermission,
  ServiceDesk,
  SoftwareInfo,
} from './models';

export function createServiceDeskServerClient(clientConfig: ClientConfig | Client) {
  const client = createClient(clientConfig);

  return {
    approvals: {
      getApprovalById: (parameters: GetApprovalById, options?: RequestOptions): Promise<Approval> =>
        approvals.getApprovalById(client, parameters, options),
      answerApproval: (parameters: AnswerApproval, options?: RequestOptions): Promise<Approval> =>
        approvals.answerApproval(client, parameters, options),
      getApprovalCommentConfig: (
        parameters: GetApprovalCommentConfig,
        options?: RequestOptions,
      ): Promise<ApprovalCommentConfig> => approvals.getApprovalCommentConfig(client, parameters, options),
      getApprovals: (parameters: GetApprovals, options?: RequestOptions): Promise<Page<Approval>> =>
        approvals.getApprovals(client, parameters, options),
    },
    requestAttachments: {
      createAttachment: (parameters: CreateAttachment, options?: RequestOptions): Promise<AttachmentCreateResult> =>
        requestAttachments.createAttachment(client, parameters, options),
      attachTemporaryFile: (
        parameters: AttachTemporaryFile,
        options?: RequestOptions,
      ): Promise<CreateTemporaryWebAttachmentResult> =>
        requestAttachments.attachTemporaryFile(client, parameters, options),
    },
    customerRequests: {
      getRequestComments: (parameters: GetRequestComments, options?: RequestOptions): Promise<Page<Comment>> =>
        customerRequests.getRequestComments(client, parameters, options),
      createRequestComment: (parameters: CreateRequestComment, options?: RequestOptions): Promise<Comment> =>
        customerRequests.createRequestComment(client, parameters, options),
      getRequestCommentById: (parameters: GetRequestCommentById, options?: RequestOptions): Promise<Comment> =>
        customerRequests.getRequestCommentById(client, parameters, options),
      getMyCustomerRequests: (
        parameters?: GetMyCustomerRequests,
        options?: RequestOptions,
      ): Promise<Page<CustomerRequest>> => customerRequests.getMyCustomerRequests(client, parameters, options),
      createCustomerRequest: (parameters: CreateCustomerRequest, options?: RequestOptions): Promise<CustomerRequest> =>
        customerRequests.createCustomerRequest(client, parameters, options),
      getCustomerRequestByIdOrKey: (
        parameters: GetCustomerRequestByIdOrKey,
        options?: RequestOptions,
      ): Promise<CustomerRequest> => customerRequests.getCustomerRequestByIdOrKey(client, parameters, options),
      getRequestParticipants: (parameters: GetRequestParticipants, options?: RequestOptions): Promise<Page<User>> =>
        customerRequests.getRequestParticipants(client, parameters, options),
      addRequestParticipants: (parameters: AddRequestParticipants, options?: RequestOptions): Promise<Page<User>> =>
        customerRequests.addRequestParticipants(client, parameters, options),
      removeRequestParticipants: (
        parameters: RemoveRequestParticipants,
        options?: RequestOptions,
      ): Promise<Page<User>> => customerRequests.removeRequestParticipants(client, parameters, options),
      getSlaInformation: (parameters: GetSlaInformation, options?: RequestOptions): Promise<Page<SlaInformation>> =>
        customerRequests.getSlaInformation(client, parameters, options),
      getSlaInformationById: (parameters: GetSlaInformationById, options?: RequestOptions): Promise<SlaInformation> =>
        customerRequests.getSlaInformationById(client, parameters, options),
      getCustomerRequestStatus: (
        parameters: GetCustomerRequestStatus,
        options?: RequestOptions,
      ): Promise<Page<CustomerRequestStatus>> => customerRequests.getCustomerRequestStatus(client, parameters, options),
    },
    customers: {
      createCustomer: (parameters: CreateCustomer, options?: RequestOptions): Promise<User> =>
        customers.createCustomer(client, parameters, options),
      addCustomers: (parameters: AddCustomers, options?: RequestOptions): Promise<User> =>
        customers.addCustomers(client, parameters, options),
    },
    customerTransitions: {
      getCustomerTransitions: (
        parameters: GetCustomerTransitions,
        options?: RequestOptions,
      ): Promise<Page<CustomerTransition>> => customerTransitions.getCustomerTransitions(client, parameters, options),
      performCustomerTransition: (parameters: PerformCustomerTransition, options?: RequestOptions): Promise<void> =>
        customerTransitions.performCustomerTransition(client, parameters, options),
    },
    organizations: {
      getUsersInOrganization: (parameters: GetUsersInOrganization, options?: RequestOptions): Promise<Page<User>> =>
        organizations.getUsersInOrganization(client, parameters, options),
      addUsersToOrganization: (parameters: AddUsersToOrganization, options?: RequestOptions): Promise<void> =>
        organizations.addUsersToOrganization(client, parameters, options),
      removeUsersFromOrganization: (parameters: RemoveUsersFromOrganization, options?: RequestOptions): Promise<void> =>
        organizations.removeUsersFromOrganization(client, parameters, options),
      previewCleanUpOrganizations: (
        parameters?: PreviewCleanUpOrganizations,
        options?: RequestOptions,
      ): Promise<CustomerOrganization[]> => organizations.previewCleanUpOrganizations(client, parameters, options),
      cleanUpOrganizations: (parameters: CleanUpOrganizations, options?: RequestOptions): Promise<unknown> =>
        organizations.cleanUpOrganizations(client, parameters, options),
      getOrganizations: (parameters?: GetOrganizations, options?: RequestOptions): Promise<Page<Organization>> =>
        organizations.getOrganizations(client, parameters, options),
      createOrganization: (parameters: CreateOrganization, options?: RequestOptions): Promise<Organization> =>
        organizations.createOrganization(client, parameters, options),
      getOrganization: (parameters: GetOrganization, options?: RequestOptions): Promise<Organization> =>
        organizations.getOrganization(client, parameters, options),
      deleteOrganization: (parameters: DeleteOrganization, options?: RequestOptions): Promise<void> =>
        organizations.deleteOrganization(client, parameters, options),
    },
    serviceDeskOrganizations: {
      getServiceDeskOrganizations: (
        parameters: GetServiceDeskOrganizations,
        options?: RequestOptions,
      ): Promise<Page<Organization>> =>
        serviceDeskOrganizations.getServiceDeskOrganizations(client, parameters, options),
      addOrganization: (parameters: AddOrganization, options?: RequestOptions): Promise<void> =>
        serviceDeskOrganizations.addOrganization(client, parameters, options),
      removeOrganization: (parameters: RemoveOrganization, options?: RequestOptions): Promise<void> =>
        serviceDeskOrganizations.removeOrganization(client, parameters, options),
    },
    portals: {
      getPortal: (parameters: GetPortal, options?: RequestOptions): Promise<Portal> =>
        portals.getPortal(client, parameters, options),
      getPortalByProjectKey: (parameters: GetPortalByProjectKey, options?: RequestOptions): Promise<Portal> =>
        portals.getPortalByProjectKey(client, parameters, options),
      getPortals: (parameters?: GetPortals, options?: RequestOptions): Promise<Page<Portal>> =>
        portals.getPortals(client, parameters, options),
    },
    queues: {
      getQueues: (parameters: GetQueues, options?: RequestOptions): Promise<Page<Queue>> =>
        queues.getQueues(client, parameters, options),
      createQueue: (parameters: CreateQueue, options?: RequestOptions): Promise<Queue> =>
        queues.createQueue(client, parameters, options),
      getQueue: (parameters: GetQueue, options?: RequestOptions): Promise<Queue> =>
        queues.getQueue(client, parameters, options),
      updateQueue: (parameters: UpdateQueue, options?: RequestOptions): Promise<Queue> =>
        queues.updateQueue(client, parameters, options),
      deleteQueue: (parameters: DeleteQueue, options?: RequestOptions): Promise<void> =>
        queues.deleteQueue(client, parameters, options),
      getIssuesInQueue: (parameters: GetIssuesInQueue, options?: RequestOptions): Promise<Page<Issue>> =>
        queues.getIssuesInQueue(client, parameters, options),
      reorderQueues: (parameters: ReorderQueues, options?: RequestOptions): Promise<Queue> =>
        queues.reorderQueues(client, parameters, options),
    },
    requestTypes: {
      getRequestTypeFields: (
        parameters: GetRequestTypeFields,
        options?: RequestOptions,
      ): Promise<CustomerRequestCreateMeta> => requestTypes.getRequestTypeFields(client, parameters, options),
      getRequestTypeGroups: (
        parameters: GetRequestTypeGroups,
        options?: RequestOptions,
      ): Promise<Page<RequestTypeGroup>> => requestTypes.getRequestTypeGroups(client, parameters, options),
      getRequestTypes: (parameters: GetRequestTypes, options?: RequestOptions): Promise<Page<RequestType>> =>
        requestTypes.getRequestTypes(client, parameters, options),
      createRequestType: (parameters: CreateRequestType, options?: RequestOptions): Promise<RequestType> =>
        requestTypes.createRequestType(client, parameters, options),
      updateRequestType: (parameters: UpdateRequestType, options?: RequestOptions): Promise<RequestType> =>
        requestTypes.updateRequestType(client, parameters, options),
      getRequestTypeById: (parameters: GetRequestTypeById, options?: RequestOptions): Promise<RequestType> =>
        requestTypes.getRequestTypeById(client, parameters, options),
      deleteRequestType: (parameters: DeleteRequestType, options?: RequestOptions): Promise<void> =>
        requestTypes.deleteRequestType(client, parameters, options),
    },
    requestTypePermissions: {
      getPermissionsByRequestTypeId: (
        parameters: GetPermissionsByRequestTypeId,
        options?: RequestOptions,
      ): Promise<RequestTypePermission> =>
        requestTypePermissions.getPermissionsByRequestTypeId(client, parameters, options),
      upsertRequestTypePermission: (
        parameters: UpsertRequestTypePermission,
        options?: RequestOptions,
      ): Promise<RequestTypePermission> =>
        requestTypePermissions.upsertRequestTypePermission(client, parameters, options),
    },
    serviceDesks: {
      getServiceDeskById: (parameters: GetServiceDeskById, options?: RequestOptions): Promise<ServiceDesk> =>
        serviceDesks.getServiceDeskById(client, parameters, options),
      getServiceDesks: (parameters?: GetServiceDesks, options?: RequestOptions): Promise<Page<ServiceDesk>> =>
        serviceDesks.getServiceDesks(client, parameters, options),
    },
    info: {
      getInfo: (options?: RequestOptions): Promise<SoftwareInfo> => info.getInfo(client, options),
    },
    queueSettings: {
      getQueueSettingsOnProject: (parameters: GetQueueSettingsOnProject, options?: RequestOptions): Promise<void> =>
        queueSettings.getQueueSettingsOnProject(client, parameters, options),
      setShouldQueuesIncludeCountGlobally: (
        parameters: SetShouldQueuesIncludeCountGlobally,
        options?: RequestOptions,
      ): Promise<void> => queueSettings.setShouldQueuesIncludeCountGlobally(client, parameters, options),
      setShouldQueuesIncludeCountOnProject: (
        parameters: SetShouldQueuesIncludeCountOnProject,
        options?: RequestOptions,
      ): Promise<void> => queueSettings.setShouldQueuesIncludeCountOnProject(client, parameters, options),
      setShouldQueuesUseCountCacheGlobally: (
        parameters: SetShouldQueuesUseCountCacheGlobally,
        options?: RequestOptions,
      ): Promise<void> => queueSettings.setShouldQueuesUseCountCacheGlobally(client, parameters, options),
      setShouldQueuesUseCountCacheOnProject: (
        parameters: SetShouldQueuesUseCountCacheOnProject,
        options?: RequestOptions,
      ): Promise<void> => queueSettings.setShouldQueuesUseCountCacheOnProject(client, parameters, options),
    },
  };
}

export type ServiceDeskServerClient = ReturnType<typeof createServiceDeskServerClient>;
