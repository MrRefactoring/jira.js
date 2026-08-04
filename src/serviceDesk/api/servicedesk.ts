import { PagedServiceDeskSchema, type PagedServiceDesk } from '../models/pagedServiceDesk';
import { ServiceDeskSchema, type ServiceDesk } from '../models/serviceDesk';
import { AttachTemporaryFileSchema, type AttachTemporaryFile } from '../models/attachTemporaryFile';
import { PagedArticleSchema, type PagedArticle } from '../models/pagedArticle';
import { PagedQueueSchema, type PagedQueue } from '../models/pagedQueue';
import { QueueSchema, type Queue } from '../models/queue';
import { PagedIssueSchema, type PagedIssue } from '../models/pagedIssue';
import { PagedRequestTypeSchema, type PagedRequestType } from '../models/pagedRequestType';
import { RequestTypeSchema, type RequestType } from '../models/requestType';
import { CustomerRequestCreateMetaSchema, type CustomerRequestCreateMeta } from '../models/customerRequestCreateMeta';
import { PagedRequestTypeGroupSchema, type PagedRequestTypeGroup } from '../models/pagedRequestTypeGroup';
import type { GetServiceDesks } from '../parameters/getServiceDesks';
import type { GetServiceDeskById } from '../parameters/getServiceDeskById';
import type { AttachTemporaryFile as AttachTemporaryFileParameters } from '../parameters/attachTemporaryFile';
import type { AddCustomers } from '../parameters/addCustomers';
import type { AddCustomersSkippingPermissionCheck } from '../parameters/addCustomersSkippingPermissionCheck';
import type { GetServiceDeskArticles } from '../parameters/getServiceDeskArticles';
import type { GetQueues } from '../parameters/getQueues';
import type { GetQueue } from '../parameters/getQueue';
import type { GetIssuesInQueue } from '../parameters/getIssuesInQueue';
import type { GetRequestTypes } from '../parameters/getRequestTypes';
import type { GetRequestTypeById } from '../parameters/getRequestTypeById';
import type { GetRequestTypeFields } from '../parameters/getRequestTypeFields';
import type { GetRequestTypeGroups } from '../parameters/getRequestTypeGroups';
import type { Client, SendRequestOptions } from '#/core';

/**
 * This method returns all the service desks in the Jira Service Management instance that the user has permission to
 * access. Use this method where you need a list of service desks or need to locate a service desk by name or keyword.
 *
 * **Note:** This method will be slow if the instance has hundreds of service desks. If you want to fetch a single
 * service desk by its ID, use
 * [/rest/servicedeskapi/servicedesk/{serviceDeskId}](./#api-rest-servicedeskapi-servicedesk-servicedeskid-get)
 * instead.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Any
 */
export async function getServiceDesks(client: Client, parameters?: GetServiceDesks): Promise<PagedServiceDesk> {
  const config: SendRequestOptions<PagedServiceDesk> = {
    url: '/rest/servicedeskapi/servicedesk',
    method: 'GET',
    searchParams: {
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: PagedServiceDeskSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns a service desk. Use this method to get service desk details whenever your application component
 * is passed a service desk ID but needs to display other service desk details.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to access the Service Desk. For example, being the Service Desk's Administrator or one of its Agents or
 * Users.
 */
export async function getServiceDeskById(client: Client, parameters: GetServiceDeskById): Promise<ServiceDesk> {
  const config: SendRequestOptions<ServiceDesk> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}`,
    method: 'GET',
    schema: ServiceDeskSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method adds one or more temporary attachments to a service desk, which can then be permanently attached to a
 * customer request using
 * [servicedeskapi/request/{issueIdOrKey}/attachment](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#api-request-issueIdOrKey-attachment-post).
 *
 * **Note**: It is possible for a service desk administrator to turn off the ability to add attachments to a service
 * desk.
 *
 * This method expects a multipart request. The media-type multipart/form-data is defined in RFC 1867. Most client
 * libraries have classes that make dealing with multipart posts simple. For instance, in Java the Apache HTTP
 * Components library provides
 * [MultiPartEntity](http://hc.apache.org/httpcomponents-client-ga/httpmime/apidocs/org/apache/http/entity/mime/MultipartEntity.html).
 *
 * Because this method accepts multipart/form-data, it has XSRF protection on it. This means you must submit a header of
 * X-Atlassian-Token: no-check with the request or it will be blocked.
 *
 * The name of the multipart/form-data parameter that contains the attachments must be `file`.
 *
 * For example, to upload a file called `myfile.txt` in the Service Desk with ID 10001 use
 *
 *     curl -D- -u customer:customer -X POST -H "X-ExperimentalApi: opt-in" -H "X-Atlassian-Token: no-check" -F "file=@myfile.txt" https://your-domain.atlassian.net/rest/servicedeskapi/servicedesk/10001/attachTemporaryFile
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to add attachments in this Service Desk.
 */
export async function attachTemporaryFile(
  client: Client,
  parameters: AttachTemporaryFileParameters,
): Promise<AttachTemporaryFile> {
  const config: SendRequestOptions<AttachTemporaryFile> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/attachTemporaryFile`,
    method: 'POST',
    body: parameters.body,
    schema: AttachTemporaryFileSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds one or more customers to a service desk. If any of the passed customers are associated with the service desk, no
 * changes will be made for those customers and the resource returns a 204 success code.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * desk administrator
 */
export async function addCustomers(client: Client, parameters: AddCustomers): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/customer`,
    method: 'POST',
    body: {
      accountIds: parameters.accountIds,
      usernames: parameters.usernames,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Adds one or more customers to a service desk on behalf of jsd-nutmeg.
 *
 * This endpoint is restricted to jsd-nutmeg via ASAP authentication. It provides the same capability as the public
 * `POST /servicedeskapi/servicedesk/{serviceDeskId}/customer` endpoint, but does not require a User Context Token (UCT)
 * or Connect app user — authorization is enforced entirely via the ASAP token.
 *
 * No user permission checks are performed; `null` is passed as the acting user to bypass the permission check in the
 * underlying service.
 *
 * If any of the passed customers are already associated with the service desk, no changes will be made for those
 * customers and the resource returns a 204 success code.
 */
export async function addCustomersSkippingPermissionCheck(
  client: Client,
  parameters: AddCustomersSkippingPermissionCheck,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/customer/skip-permission-check`,
    method: 'POST',
    body: {
      accountIds: parameters.accountIds,
      usernames: parameters.usernames,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns articles which match the given query and belong to the knowledge base linked to the service desk.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to access the service desk.
 */
export async function getServiceDeskArticles(
  client: Client,
  parameters: GetServiceDeskArticles,
): Promise<PagedArticle> {
  const config: SendRequestOptions<PagedArticle> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/knowledgebase/article`,
    method: 'GET',
    searchParams: {
      query: parameters.query,
      highlight: parameters.highlight,
      start: parameters.start,
      limit: parameters.limit,
      cursor: parameters.cursor,
      prev: parameters.prev,
    },
    schema: PagedArticleSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns the queues in a service desk. To include a customer request count for each queue (in the
 * `issueCount` field) in the response, set the query parameter `includeCount` to true (its default is false).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: service
 * desk's Agent.
 */
export async function getQueues(client: Client, parameters: GetQueues): Promise<PagedQueue> {
  const config: SendRequestOptions<PagedQueue> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue`,
    method: 'GET',
    searchParams: {
      includeCount: parameters.includeCount,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedQueueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns a specific queues in a service desk. To include a customer request count for the queue (in the
 * `issueCount` field) in the response, set the query parameter `includeCount` to true (its default is false).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: service
 * desk's Agent.
 */
export async function getQueue(client: Client, parameters: GetQueue): Promise<Queue> {
  const config: SendRequestOptions<Queue> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue/${parameters.queueId}`,
    method: 'GET',
    searchParams: {
      includeCount: parameters.includeCount,
    },
    schema: QueueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns the customer requests in a queue. Only fields that the queue is configured to show are returned.
 * For example, if a queue is configured to show description and due date, then only those two fields are returned for
 * each customer request in the queue.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Service
 * desk's agent.
 */
export async function getIssuesInQueue(client: Client, parameters: GetIssuesInQueue): Promise<PagedIssue> {
  const config: SendRequestOptions<PagedIssue> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue/${parameters.queueId}/issue`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedIssueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns all customer request types from a service desk. There are two parameters for filtering the
 * returned list:
 *
 * - `groupId` which filters the results to items in the customer request type group.
 * - `searchQuery` which is matched against request types' `name` or `description`. For example, the strings "Install",
 *   "Inst", "Equi", or "Equipment" will match a request type with the _name_ "Equipment Installation Request".
 *
 * **Note:** This API by default will filter out request types hidden in the portal (i.e. request types without groups
 * and request types where a user doesn't have permission) when `searchQuery` is provided, unless
 * `includeHiddenRequestTypesInSearch` is set to true. Restricted request types will not be returned for those who
 * aren't admins.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to access the service desk.
 */
export async function getRequestTypes(client: Client, parameters: GetRequestTypes): Promise<PagedRequestType> {
  const config: SendRequestOptions<PagedRequestType> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype`,
    method: 'GET',
    searchParams: {
      groupId: parameters.groupId,
      expand: parameters.expand,
      searchQuery: parameters.searchQuery,
      start: parameters.start,
      limit: parameters.limit,
      includeHiddenRequestTypesInSearch: parameters.includeHiddenRequestTypesInSearch,
      restrictionStatus: parameters.restrictionStatus,
    },
    schema: PagedRequestTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns a customer request type from a service desk.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to access the service desk.
 */
export async function getRequestTypeById(client: Client, parameters: GetRequestTypeById): Promise<RequestType> {
  const config: SendRequestOptions<RequestType> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: RequestTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns the fields for a service desk's customer request type.
 *
 * Also, the following information about the user's permissions for the request type is returned:
 *
 * - `canRaiseOnBehalfOf` returns `true` if the user has permission to raise customer requests on behalf of other
 *   customers. Otherwise, returns `false`.
 * - `canAddRequestParticipants` returns `true` if the user can add customer request participants. Otherwise, returns
 *   `false`.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the Service Desk. However, hidden fields would be visible to only Service desk's Administrator.
 */
export async function getRequestTypeFields(
  client: Client,
  parameters: GetRequestTypeFields,
): Promise<CustomerRequestCreateMeta> {
  const config: SendRequestOptions<CustomerRequestCreateMeta> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}/field`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: CustomerRequestCreateMetaSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method returns a service desk's customer request type groups. Jira Service Management administrators can arrange
 * the customer request type groups in an arbitrary order for display on the customer portal; the groups are returned in
 * this order.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**:
 * Permission to view the service desk.
 */
export async function getRequestTypeGroups(
  client: Client,
  parameters: GetRequestTypeGroups,
): Promise<PagedRequestTypeGroup> {
  const config: SendRequestOptions<PagedRequestTypeGroup> = {
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
