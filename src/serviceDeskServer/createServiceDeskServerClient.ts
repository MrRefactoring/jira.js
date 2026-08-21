import { type ClientConfig, type Client, createClient } from '#/core';
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
      getApprovalById: (parameters: GetApprovalById): Promise<Approval> =>
        approvals.getApprovalById(client, parameters),
      answerApproval: (parameters: AnswerApproval): Promise<Approval> => approvals.answerApproval(client, parameters),
      getApprovalCommentConfig: (parameters: GetApprovalCommentConfig): Promise<ApprovalCommentConfig> =>
        approvals.getApprovalCommentConfig(client, parameters),
      getApprovals: (parameters: GetApprovals): Promise<Page<Approval>> => approvals.getApprovals(client, parameters),
    },
    requestAttachments: {
      createAttachment: (parameters: CreateAttachment): Promise<AttachmentCreateResult> =>
        requestAttachments.createAttachment(client, parameters),
      attachTemporaryFile: (parameters: AttachTemporaryFile): Promise<CreateTemporaryWebAttachmentResult> =>
        requestAttachments.attachTemporaryFile(client, parameters),
    },
    customerRequests: {
      getRequestComments: (parameters: GetRequestComments): Promise<Page<Comment>> =>
        customerRequests.getRequestComments(client, parameters),
      createRequestComment: (parameters: CreateRequestComment): Promise<Comment> =>
        customerRequests.createRequestComment(client, parameters),
      getRequestCommentById: (parameters: GetRequestCommentById): Promise<Comment> =>
        customerRequests.getRequestCommentById(client, parameters),
      getMyCustomerRequests: (parameters?: GetMyCustomerRequests): Promise<Page<CustomerRequest>> =>
        customerRequests.getMyCustomerRequests(client, parameters),
      createCustomerRequest: (parameters: CreateCustomerRequest): Promise<CustomerRequest> =>
        customerRequests.createCustomerRequest(client, parameters),
      getCustomerRequestByIdOrKey: (parameters: GetCustomerRequestByIdOrKey): Promise<CustomerRequest> =>
        customerRequests.getCustomerRequestByIdOrKey(client, parameters),
      getRequestParticipants: (parameters: GetRequestParticipants): Promise<Page<User>> =>
        customerRequests.getRequestParticipants(client, parameters),
      addRequestParticipants: (parameters: AddRequestParticipants): Promise<Page<User>> =>
        customerRequests.addRequestParticipants(client, parameters),
      removeRequestParticipants: (parameters: RemoveRequestParticipants): Promise<Page<User>> =>
        customerRequests.removeRequestParticipants(client, parameters),
      getSlaInformation: (parameters: GetSlaInformation): Promise<Page<SlaInformation>> =>
        customerRequests.getSlaInformation(client, parameters),
      getSlaInformationById: (parameters: GetSlaInformationById): Promise<SlaInformation> =>
        customerRequests.getSlaInformationById(client, parameters),
      getCustomerRequestStatus: (parameters: GetCustomerRequestStatus): Promise<Page<CustomerRequestStatus>> =>
        customerRequests.getCustomerRequestStatus(client, parameters),
    },
    customers: {
      createCustomer: (parameters: CreateCustomer): Promise<User> => customers.createCustomer(client, parameters),
      addCustomers: (parameters: AddCustomers): Promise<User> => customers.addCustomers(client, parameters),
    },
    customerTransitions: {
      getCustomerTransitions: (parameters: GetCustomerTransitions): Promise<Page<CustomerTransition>> =>
        customerTransitions.getCustomerTransitions(client, parameters),
      performCustomerTransition: (parameters: PerformCustomerTransition): Promise<void> =>
        customerTransitions.performCustomerTransition(client, parameters),
    },
    organizations: {
      getUsersInOrganization: (parameters: GetUsersInOrganization): Promise<Page<User>> =>
        organizations.getUsersInOrganization(client, parameters),
      addUsersToOrganization: (parameters: AddUsersToOrganization): Promise<void> =>
        organizations.addUsersToOrganization(client, parameters),
      removeUsersFromOrganization: (parameters: RemoveUsersFromOrganization): Promise<void> =>
        organizations.removeUsersFromOrganization(client, parameters),
      previewCleanUpOrganizations: (parameters?: PreviewCleanUpOrganizations): Promise<CustomerOrganization[]> =>
        organizations.previewCleanUpOrganizations(client, parameters),
      cleanUpOrganizations: (parameters: CleanUpOrganizations): Promise<unknown> =>
        organizations.cleanUpOrganizations(client, parameters),
      getOrganizations: (parameters?: GetOrganizations): Promise<Page<Organization>> =>
        organizations.getOrganizations(client, parameters),
      createOrganization: (parameters: CreateOrganization): Promise<Organization> =>
        organizations.createOrganization(client, parameters),
      getOrganization: (parameters: GetOrganization): Promise<Organization> =>
        organizations.getOrganization(client, parameters),
      deleteOrganization: (parameters: DeleteOrganization): Promise<void> =>
        organizations.deleteOrganization(client, parameters),
    },
    serviceDeskOrganizations: {
      getServiceDeskOrganizations: (parameters: GetServiceDeskOrganizations): Promise<Page<Organization>> =>
        serviceDeskOrganizations.getServiceDeskOrganizations(client, parameters),
      addOrganization: (parameters: AddOrganization): Promise<void> =>
        serviceDeskOrganizations.addOrganization(client, parameters),
      removeOrganization: (parameters: RemoveOrganization): Promise<void> =>
        serviceDeskOrganizations.removeOrganization(client, parameters),
    },
    portals: {
      getPortal: (parameters: GetPortal): Promise<Portal> => portals.getPortal(client, parameters),
      getPortalByProjectKey: (parameters: GetPortalByProjectKey): Promise<Portal> =>
        portals.getPortalByProjectKey(client, parameters),
      getPortals: (parameters?: GetPortals): Promise<Page<Portal>> => portals.getPortals(client, parameters),
    },
    queues: {
      getQueues: (parameters: GetQueues): Promise<Page<Queue>> => queues.getQueues(client, parameters),
      createQueue: (parameters: CreateQueue): Promise<Queue> => queues.createQueue(client, parameters),
      getQueue: (parameters: GetQueue): Promise<Queue> => queues.getQueue(client, parameters),
      updateQueue: (parameters: UpdateQueue): Promise<Queue> => queues.updateQueue(client, parameters),
      deleteQueue: (parameters: DeleteQueue): Promise<void> => queues.deleteQueue(client, parameters),
      getIssuesInQueue: (parameters: GetIssuesInQueue): Promise<Page<Issue>> =>
        queues.getIssuesInQueue(client, parameters),
      reorderQueues: (parameters: ReorderQueues): Promise<Queue> => queues.reorderQueues(client, parameters),
    },
    requestTypes: {
      getRequestTypeFields: (parameters: GetRequestTypeFields): Promise<CustomerRequestCreateMeta> =>
        requestTypes.getRequestTypeFields(client, parameters),
      getRequestTypeGroups: (parameters: GetRequestTypeGroups): Promise<Page<RequestTypeGroup>> =>
        requestTypes.getRequestTypeGroups(client, parameters),
      getRequestTypes: (parameters: GetRequestTypes): Promise<Page<RequestType>> =>
        requestTypes.getRequestTypes(client, parameters),
      createRequestType: (parameters: CreateRequestType): Promise<RequestType> =>
        requestTypes.createRequestType(client, parameters),
      updateRequestType: (parameters: UpdateRequestType): Promise<RequestType> =>
        requestTypes.updateRequestType(client, parameters),
      getRequestTypeById: (parameters: GetRequestTypeById): Promise<RequestType> =>
        requestTypes.getRequestTypeById(client, parameters),
      deleteRequestType: (parameters: DeleteRequestType): Promise<void> =>
        requestTypes.deleteRequestType(client, parameters),
    },
    requestTypePermissions: {
      getPermissionsByRequestTypeId: (parameters: GetPermissionsByRequestTypeId): Promise<RequestTypePermission> =>
        requestTypePermissions.getPermissionsByRequestTypeId(client, parameters),
      upsertRequestTypePermission: (parameters: UpsertRequestTypePermission): Promise<RequestTypePermission> =>
        requestTypePermissions.upsertRequestTypePermission(client, parameters),
    },
    serviceDesks: {
      getServiceDeskById: (parameters: GetServiceDeskById): Promise<ServiceDesk> =>
        serviceDesks.getServiceDeskById(client, parameters),
      getServiceDesks: (parameters?: GetServiceDesks): Promise<Page<ServiceDesk>> =>
        serviceDesks.getServiceDesks(client, parameters),
    },
    info: {
      getInfo: (): Promise<SoftwareInfo> => info.getInfo(client),
    },
    queueSettings: {
      getQueueSettingsOnProject: (parameters: GetQueueSettingsOnProject): Promise<void> =>
        queueSettings.getQueueSettingsOnProject(client, parameters),
      setShouldQueuesIncludeCountGlobally: (parameters: SetShouldQueuesIncludeCountGlobally): Promise<void> =>
        queueSettings.setShouldQueuesIncludeCountGlobally(client, parameters),
      setShouldQueuesIncludeCountOnProject: (parameters: SetShouldQueuesIncludeCountOnProject): Promise<void> =>
        queueSettings.setShouldQueuesIncludeCountOnProject(client, parameters),
      setShouldQueuesUseCountCacheGlobally: (parameters: SetShouldQueuesUseCountCacheGlobally): Promise<void> =>
        queueSettings.setShouldQueuesUseCountCacheGlobally(client, parameters),
      setShouldQueuesUseCountCacheOnProject: (parameters: SetShouldQueuesUseCountCacheOnProject): Promise<void> =>
        queueSettings.setShouldQueuesUseCountCacheOnProject(client, parameters),
    },
  };
}

export type ServiceDeskServerClient = ReturnType<typeof createServiceDeskServerClient>;
