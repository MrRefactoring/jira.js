import type { Mime } from 'mime';
import mime from 'mime';
import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class ServiceDesk {
  constructor(private client: Client) {}

  /**
   * This method returns all the service desks in the Jira Service Management instance that the user has permission to
   * access. Use this method where you need a list of service desks or need to locate a service desk by name or
   * keyword.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   */
  async getServiceDesks<T = Models.PagedServiceDesk>(
    parameters: Parameters.GetServiceDesks | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns all the service desks in the Jira Service Management instance that the user has permission to
   * access. Use this method where you need a list of service desks or need to locate a service desk by name or
   * keyword.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Any
   */
  async getServiceDesks<T = Models.PagedServiceDesk>(
    parameters?: Parameters.GetServiceDesks,
    callback?: never,
  ): Promise<T>;
  async getServiceDesks<T = Models.PagedServiceDesk>(
    parameters?: Parameters.GetServiceDesks,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/servicedeskapi/servicedesk',
      method: 'GET',
      params: {
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns a service desk. Use this method to get service desk details whenever your application component
   * is passed a service desk ID but needs to display other service desk details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the Service Desk. For example, being the Service Desk's Administrator or one of its Agents or
   * Users.
   */
  async getServiceDeskById<T = Models.ServiceDesk>(
    parameters: Parameters.GetServiceDeskById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns a service desk. Use this method to get service desk details whenever your application component
   * is passed a service desk ID but needs to display other service desk details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the Service Desk. For example, being the Service Desk's Administrator or one of its Agents or
   * Users.
   */
  async getServiceDeskById<T = Models.ServiceDesk>(
    parameters: Parameters.GetServiceDeskById,
    callback?: never,
  ): Promise<T>;
  async getServiceDeskById<T = Models.ServiceDesk>(
    parameters: Parameters.GetServiceDeskById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method adds one or more temporary attachments to a service desk, which can then be permanently attached to a
   * customer request using
   * [servicedeskapi/request/{issueIdOrKey}/attachment](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-rest-servicedeskapi-servicedesk-servicedeskid-attachtemporaryfile-post).
   *
   * **Note**: It is possible for a service desk administrator to turn off the ability to add attachments to a service
   * desk.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to add attachments in this Service Desk.
   */
  async attachTemporaryFile<T = unknown>(
    parameters: Parameters.AttachTemporaryFile,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method adds one or more temporary attachments to a service desk, which can then be permanently attached to a
   * customer request using
   * [servicedeskapi/request/{issueIdOrKey}/attachment](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-rest-servicedeskapi-servicedesk-servicedeskid-attachtemporaryfile-post).
   *
   * **Note**: It is possible for a service desk administrator to turn off the ability to add attachments to a service
   * desk.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to add attachments in this Service Desk.
   */
  async attachTemporaryFile<T = unknown>(parameters: Parameters.AttachTemporaryFile, callback?: never): Promise<T>;
  async attachTemporaryFile<T = unknown>(
    parameters: Parameters.AttachTemporaryFile,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const formData = new FormData();
    const attachments = Array.isArray(parameters.attachment) ? parameters.attachment : [parameters.attachment];

    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    let Readable: typeof import('stream').Readable | undefined;

    if (typeof window === 'undefined') {
      const { Readable: NodeReadable } = await import('stream');

      Readable = NodeReadable;
    }

    for await (const attachment of attachments) {
      const file = await this._convertToFile(attachment, mime, Readable);

      if (!(file instanceof File || file instanceof Blob)) {
        throw new Error(`Unsupported file type for attachment: ${typeof file}`);
      }

      formData.append('file', file, attachment.filename);
    }

    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/attachTemporaryFile`,
      method: 'POST',
      headers: {
        'X-Atlassian-Token': 'no-check',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns a list of the customers on a service desk.
   *
   * The returned list of customers can be filtered using the `query` parameter. The parameter is matched against
   * customers' `displayName`, `name`, or `email`. For example, searching for "John", "Jo", "Smi", or "Smith" will match
   * a user with display name "John Smith".
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view this Service Desk's customers.
   */
  async getCustomers<T = Models.PagedUser>(parameters: Parameters.GetCustomers, callback: Callback<T>): Promise<void>;
  /**
   * This method returns a list of the customers on a service desk.
   *
   * The returned list of customers can be filtered using the `query` parameter. The parameter is matched against
   * customers' `displayName`, `name`, or `email`. For example, searching for "John", "Jo", "Smi", or "Smith" will match
   * a user with display name "John Smith".
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view this Service Desk's customers.
   */
  async getCustomers<T = Models.PagedUser>(parameters: Parameters.GetCustomers, callback?: never): Promise<T>;
  async getCustomers<T = Models.PagedUser>(
    parameters: Parameters.GetCustomers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/customer`,
      method: 'GET',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
      params: {
        query: parameters.query,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds one or more customers to a service desk. If any of the passed customers are associated with the service desk,
   * no changes will be made for those customers and the resource returns a 204 success code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator
   */
  async addCustomers<T = void>(parameters: Parameters.AddCustomers, callback: Callback<T>): Promise<void>;
  /**
   * Adds one or more customers to a service desk. If any of the passed customers are associated with the service desk,
   * no changes will be made for those customers and the resource returns a 204 success code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator
   */
  async addCustomers<T = void>(parameters: Parameters.AddCustomers, callback?: never): Promise<T>;
  async addCustomers<T = void>(parameters: Parameters.AddCustomers, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/customer`,
      method: 'POST',
      data: {
        usernames: parameters.usernames,
        accountIds: parameters.accountIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method removes one or more customers from a service desk. The service desk must have closed access. If any of
   * the passed customers are not associated with the service desk, no changes will be made for those customers and the
   * resource returns a 204 success code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Services desk administrator
   */
  async removeCustomers<T = void>(parameters: Parameters.RemoveCustomers, callback: Callback<T>): Promise<void>;
  /**
   * This method removes one or more customers from a service desk. The service desk must have closed access. If any of
   * the passed customers are not associated with the service desk, no changes will be made for those customers and the
   * resource returns a 204 success code.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Services desk administrator
   */
  async removeCustomers<T = void>(parameters: Parameters.RemoveCustomers, callback?: never): Promise<T>;
  async removeCustomers<T = void>(parameters: Parameters.RemoveCustomers, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/customer`,
      method: 'DELETE',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
      data: {
        usernames: parameters.usernames,
        accountIds: parameters.accountIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns articles which match the given query and belong to the knowledge base linked to the service desk.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the service desk.
   */
  async getArticles<T = Models.PagedArticle>(parameters: Parameters.GetArticles, callback: Callback<T>): Promise<void>;
  /**
   * Returns articles which match the given query and belong to the knowledge base linked to the service desk.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the service desk.
   */
  async getArticles<T = Models.PagedArticle>(parameters: Parameters.GetArticles, callback?: never): Promise<T>;
  async getArticles<T = Models.PagedArticle>(
    parameters: Parameters.GetArticles,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/knowledgebase/article`,
      method: 'GET',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
      params: {
        query: parameters.query,
        highlight: parameters.highlight,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns the queues in a service desk. To include a customer request count for each queue (in the
   * `issueCount` field) in the response, set the query parameter `includeCount` to true (its default is false).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * service desk's Agent.
   */
  async getQueues<T = Models.PagedQueue>(parameters: Parameters.GetQueues, callback: Callback<T>): Promise<void>;
  /**
   * This method returns the queues in a service desk. To include a customer request count for each queue (in the
   * `issueCount` field) in the response, set the query parameter `includeCount` to true (its default is false).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * service desk's Agent.
   */
  async getQueues<T = Models.PagedQueue>(parameters: Parameters.GetQueues, callback?: never): Promise<T>;
  async getQueues<T = Models.PagedQueue>(parameters: Parameters.GetQueues, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue`,
      method: 'GET',
      params: {
        includeCount: parameters.includeCount,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns a specific queues in a service desk. To include a customer request count for the queue (in the
   * `issueCount` field) in the response, set the query parameter `includeCount` to true (its default is false).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * service desk's Agent.
   */
  async getQueue<T = Models.Queue>(parameters: Parameters.GetQueue, callback: Callback<T>): Promise<void>;
  /**
   * This method returns a specific queues in a service desk. To include a customer request count for the queue (in the
   * `issueCount` field) in the response, set the query parameter `includeCount` to true (its default is false).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * service desk's Agent.
   */
  async getQueue<T = Models.Queue>(parameters: Parameters.GetQueue, callback?: never): Promise<T>;
  async getQueue<T = Models.Queue>(parameters: Parameters.GetQueue, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue/${parameters.queueId}`,
      method: 'GET',
      params: {
        includeCount: parameters.includeCount,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns the customer requests in a queue. Only fields that the queue is configured to show are
   * returned. For example, if a queue is configured to show description and due date, then only those two fields are
   * returned for each customer request in the queue.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk's agent.
   */
  async getIssuesInQueue<T = Models.PagedIssue>(
    parameters: Parameters.GetIssuesInQueue,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns the customer requests in a queue. Only fields that the queue is configured to show are
   * returned. For example, if a queue is configured to show description and due date, then only those two fields are
   * returned for each customer request in the queue.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk's agent.
   */
  async getIssuesInQueue<T = Models.PagedIssue>(parameters: Parameters.GetIssuesInQueue, callback?: never): Promise<T>;
  async getIssuesInQueue<T = Models.PagedIssue>(
    parameters: Parameters.GetIssuesInQueue,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/queue/${parameters.queueId}/issue`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns all customer request types from a service desk. There are two parameters for filtering the
   * returned list:
   *
   * - `groupId` which filters the results to items in the customer request type group.
   * - `searchQuery` which is matched against request types' `name` or `description`. For example, the strings "Install",
   *   "Inst", "Equi", or "Equipment" will match a request type with the _name_ "Equipment Installation Request".
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the service desk.
   */
  async getRequestTypes<T = Models.PagedRequestType>(
    parameters: Parameters.GetRequestTypes,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns all customer request types from a service desk. There are two parameters for filtering the
   * returned list:
   *
   * - `groupId` which filters the results to items in the customer request type group.
   * - `searchQuery` which is matched against request types' `name` or `description`. For example, the strings "Install",
   *   "Inst", "Equi", or "Equipment" will match a request type with the _name_ "Equipment Installation Request".
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the service desk.
   */
  async getRequestTypes<T = Models.PagedRequestType>(
    parameters: Parameters.GetRequestTypes,
    callback?: never,
  ): Promise<T>;
  async getRequestTypes<T = Models.PagedRequestType>(
    parameters: Parameters.GetRequestTypes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype`,
      method: 'GET',
      params: {
        groupId: parameters.groupId,
        expand: parameters.expand,
        searchQuery: parameters.searchQuery,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method enables a customer request type to be added to a service desk based on an issue type. Note that not all
   * customer request type fields can be specified in the request and these fields are given the following default
   * values:
   *
   * - Request type icon is given the headset icon.
   * - Request type groups is left empty, which means this customer request type will not be visible on the [customer
   *   portal](https://confluence.atlassian.com/servicedeskcloud/configuring-the-customer-portal-732528918.html).
   * - Request type status mapping is left empty, so the request type has no custom status mapping but inherits the status
   *   map from the issue type upon which it is based.
   * - Request type field mapping is set to show the required fields as specified by the issue type used to create the
   *   customer request type.
   *
   * These fields can be updated by a service desk administrator using the **Request types** option in **Project
   * settings**.\
   * Request Types are created in next-gen projects by creating Issue Types. Please use the Jira Cloud Platform Create
   * issue type endpoint instead.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk's administrator
   */
  async createRequestType<T = Models.RequestType>(
    parameters: Parameters.CreateRequestType,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method enables a customer request type to be added to a service desk based on an issue type. Note that not all
   * customer request type fields can be specified in the request and these fields are given the following default
   * values:
   *
   * - Request type icon is given the headset icon.
   * - Request type groups is left empty, which means this customer request type will not be visible on the [customer
   *   portal](https://confluence.atlassian.com/servicedeskcloud/configuring-the-customer-portal-732528918.html).
   * - Request type status mapping is left empty, so the request type has no custom status mapping but inherits the status
   *   map from the issue type upon which it is based.
   * - Request type field mapping is set to show the required fields as specified by the issue type used to create the
   *   customer request type.
   *
   * These fields can be updated by a service desk administrator using the **Request types** option in **Project
   * settings**.\
   * Request Types are created in next-gen projects by creating Issue Types. Please use the Jira Cloud Platform Create
   * issue type endpoint instead.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk's administrator
   */
  async createRequestType<T = Models.RequestType>(
    parameters: Parameters.CreateRequestType,
    callback?: never,
  ): Promise<T>;
  async createRequestType<T = Models.RequestType>(
    parameters: Parameters.CreateRequestType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype`,
      method: 'POST',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
      data: {
        issueTypeId: parameters.issueTypeId,
        name: parameters.name,
        description: parameters.description,
        helpText: parameters.helpText,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns a customer request type from a service desk.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the service desk.
   */
  async getRequestTypeById<T = Models.RequestType>(
    parameters: Parameters.GetRequestTypeById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns a customer request type from a service desk.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to access the service desk.
   */
  async getRequestTypeById<T = Models.RequestType>(
    parameters: Parameters.GetRequestTypeById,
    callback?: never,
  ): Promise<T>;
  async getRequestTypeById<T = Models.RequestType>(
    parameters: Parameters.GetRequestTypeById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method deletes a customer request type from a service desk, and removes it from all customer requests.\
   * This only supports classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator.
   */
  async deleteRequestType<T = void>(parameters: Parameters.DeleteRequestType, callback: Callback<T>): Promise<void>;
  /**
   * This method deletes a customer request type from a service desk, and removes it from all customer requests.\
   * This only supports classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Service desk administrator.
   */
  async deleteRequestType<T = void>(parameters: Parameters.DeleteRequestType, callback?: never): Promise<T>;
  async deleteRequestType<T = void>(
    parameters: Parameters.DeleteRequestType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}`,
      method: 'DELETE',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
    };

    return this.client.sendRequest(config, callback);
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the Service Desk. However, hidden fields would be visible to only Service desk's Administrator.
   */
  async getRequestTypeFields<T = Models.CustomerRequestCreateMeta>(
    parameters: Parameters.GetRequestTypeFields,
    callback: Callback<T>,
  ): Promise<void>;
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the Service Desk. However, hidden fields would be visible to only Service desk's Administrator.
   */
  async getRequestTypeFields<T = Models.CustomerRequestCreateMeta>(
    parameters: Parameters.GetRequestTypeFields,
    callback?: never,
  ): Promise<T>;
  async getRequestTypeFields<T = Models.CustomerRequestCreateMeta>(
    parameters: Parameters.GetRequestTypeFields,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}/field`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the keys of all properties for a request type.
   *
   * Properties for a Request Type in next-gen are stored as Issue Type properties and therefore the keys of all
   * properties for a request type are also available by calling the Jira Cloud Platform [Get issue type property
   * keys](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-get)
   * endpoint.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: The
   * user must have permission to view the request type.
   */
  async getPropertiesKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetPropertiesKeys,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the keys of all properties for a request type.
   *
   * Properties for a Request Type in next-gen are stored as Issue Type properties and therefore the keys of all
   * properties for a request type are also available by calling the Jira Cloud Platform [Get issue type property
   * keys](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-get)
   * endpoint.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: The
   * user must have permission to view the request type.
   */
  async getPropertiesKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetPropertiesKeys,
    callback?: never,
  ): Promise<T>;
  async getPropertiesKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetPropertiesKeys,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}/property`,
      method: 'GET',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the value of the property from a request type.
   *
   * Properties for a Request Type in next-gen are stored as Issue Type properties and therefore also available by
   * calling the Jira Cloud Platform [Get issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-propertyKey-get)
   * endpoint.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * must have permission to view the request type.
   */
  async getProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the value of the property from a request type.
   *
   * Properties for a Request Type in next-gen are stored as Issue Type properties and therefore also available by
   * calling the Jira Cloud Platform [Get issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-propertyKey-get)
   * endpoint.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: User
   * must have permission to view the request type.
   */
  async getProperty<T = Models.EntityProperty>(parameters: Parameters.GetProperty, callback?: never): Promise<T>;
  async getProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}/property/${parameters.propertyKey}`,
      method: 'GET',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the value of a request type property. Use this resource to store custom data against a request type.
   *
   * Properties for a Request Type in next-gen are stored as Issue Type properties and therefore can also be set by
   * calling the Jira Cloud Platform [Set issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-propertyKey-put)
   * endpoint.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Jira
   * project administrator with a Jira Service Management agent license.
   */
  async setProperty<T = unknown>(parameters: Parameters.SetProperty, callback: Callback<T>): Promise<void>;
  /**
   * Sets the value of a request type property. Use this resource to store custom data against a request type.
   *
   * Properties for a Request Type in next-gen are stored as Issue Type properties and therefore can also be set by
   * calling the Jira Cloud Platform [Set issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-propertyKey-put)
   * endpoint.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Jira
   * project administrator with a Jira Service Management agent license.
   */
  async setProperty<T = unknown>(parameters: Parameters.SetProperty, callback?: never): Promise<T>;
  async setProperty<T = unknown>(parameters: Parameters.SetProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}/property/${parameters.propertyKey}`,
      method: 'PUT',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a property from a request type.
   *
   * Properties for a Request Type in next-gen are stored as Issue Type properties and therefore can also be deleted by
   * calling the Jira Cloud Platform [Delete issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-propertyKey-delete)
   * endpoint.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Jira
   * project administrator with a Jira Service Management agent license.
   */
  async deleteProperty<T = void>(parameters: Parameters.DeleteProperty, callback: Callback<T>): Promise<void>;
  /**
   * Removes a property from a request type.
   *
   * Properties for a Request Type in next-gen are stored as Issue Type properties and therefore can also be deleted by
   * calling the Jira Cloud Platform [Delete issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issuetype-issueTypeId-properties-propertyKey-delete)
   * endpoint.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Jira
   * project administrator with a Jira Service Management agent license.
   */
  async deleteProperty<T = void>(parameters: Parameters.DeleteProperty, callback?: never): Promise<T>;
  async deleteProperty<T = void>(parameters: Parameters.DeleteProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttype/${parameters.requestTypeId}/property/${parameters.propertyKey}`,
      method: 'DELETE',
      headers: {
        'X-ExperimentalApi': 'opt-in',
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * This method returns a service desk's customer request type groups. Jira Service Management administrators can
   * arrange the customer request type groups in an arbitrary order for display on the customer portal; the groups are
   * returned in this order.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the service desk.
   */
  async getRequestTypeGroups<T = Models.PagedRequestTypeGroup>(
    parameters: Parameters.GetRequestTypeGroups,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method returns a service desk's customer request type groups. Jira Service Management administrators can
   * arrange the customer request type groups in an arbitrary order for display on the customer portal; the groups are
   * returned in this order.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**:
   * Permission to view the service desk.
   */
  async getRequestTypeGroups<T = Models.PagedRequestTypeGroup>(
    parameters: Parameters.GetRequestTypeGroups,
    callback?: never,
  ): Promise<T>;
  async getRequestTypeGroups<T = Models.PagedRequestTypeGroup>(
    parameters: Parameters.GetRequestTypeGroups,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/requesttypegroup`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  private async _convertToFile(
    attachment: Parameters.Attachment,
    mime: Mime,
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    Readable?: typeof import('stream').Readable,
  ): Promise<File | Blob> {
    const toUint8Array = (input: ArrayBuffer | ArrayBufferView) => {
      if (ArrayBuffer.isView(input)) {
        const view = input as ArrayBufferView;
        const src = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
        const copy = new Uint8Array(src.byteLength);
        copy.set(src);

        return copy;
      }
      const buf = input as ArrayBuffer;
      const src = new Uint8Array(buf);
      const copy = new Uint8Array(src.byteLength);
      copy.set(src);

      return copy;
    };

    const mimeType = attachment.mimeType ?? (mime.getType(attachment.filename) || undefined);

    if (attachment.file instanceof Blob || attachment.file instanceof File) {
      return attachment.file;
    }

    if (typeof attachment.file === 'string') {
      return new File([attachment.file], attachment.filename, { type: mimeType });
    }

    if (Readable && attachment.file instanceof Readable) {
      return this._streamToBlob(attachment.file, attachment.filename, mimeType);
    }

    if (attachment.file instanceof ReadableStream) {
      return this._streamToBlob(attachment.file, attachment.filename, mimeType);
    }

    if (ArrayBuffer.isView(attachment.file) || attachment.file instanceof ArrayBuffer) {
      const arr = toUint8Array(attachment.file as ArrayBuffer | ArrayBufferView);

      return new File([arr], attachment.filename, { type: mimeType });
    }

    throw new Error('Unsupported attachment file type.');
  }

  private async _streamToBlob(
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    stream: import('stream').Readable | ReadableStream,
    filename: string,
    mimeType?: string,
  ): Promise<File> {
    const toUint8Array = (input: ArrayBuffer | ArrayBufferView) => {
      if (ArrayBuffer.isView(input)) {
        const view = input as ArrayBufferView;
        const src = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
        const copy = new Uint8Array(src.byteLength);
        copy.set(src);

        return copy;
      }
      const buf = input as ArrayBuffer;
      const src = new Uint8Array(buf);
      const copy = new Uint8Array(src.byteLength);
      copy.set(src);

      return copy;
    };

    const mergeChunks = (chunks: Uint8Array[]) => {
      const totalLength = chunks.reduce((sum, c) => sum + c.byteLength, 0);
      const merged = new Uint8Array(totalLength);
      let offset = 0;
      for (const c of chunks) {
        merged.set(c, offset);
        offset += c.byteLength;
      }

      return merged;
    };

    if (typeof window === 'undefined' && stream instanceof (await import('stream')).Readable) {
      return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];

        stream.on('data', chunk => {
          if (ArrayBuffer.isView(chunk) || chunk instanceof ArrayBuffer) {
            chunks.push(toUint8Array(chunk));
          } else {
            chunks.push(new Uint8Array(chunk));
          }
        });

        stream.on('end', () => {
          const merged = mergeChunks(chunks);
          const blob = new Blob([merged], { type: mimeType });
          resolve(new File([blob], filename, { type: mimeType }));
        });

        stream.on('error', reject);
      });
    }

    if (stream instanceof ReadableStream) {
      const reader = stream.getReader();
      const chunks: Uint8Array[] = [];
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        if (value) chunks.push(toUint8Array(value));
        done = streamDone;
      }

      const merged = mergeChunks(chunks);
      const blob = new Blob([merged], { type: mimeType });

      return new File([blob], filename, { type: mimeType });
    }

    throw new Error('Unsupported stream type.');
  }
}
