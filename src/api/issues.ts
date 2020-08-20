import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import {
  IssueCreateMetadata,
  IssueBean,
  PageBeanChangelog,
  IssueUpdateMetadata,
  Transitions,
} from '../schemas';
export class Issues {
  constructor(private readonly client: Sender) {}

  public async createIssue(
    params?: {
      updateHistory?: boolean;
      transition?: any;
      fields?: any;
      update?: any;
      historyMetadata?: any;
      properties?: Array<any>;
      [key: string]: any;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issue',
      method: 'POST',
      params: {
        updateHistory: params.updateHistory,
      },
      data: { ...params, updateHistory: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async bulkCreateIssue(
    params?: {
      issueUpdates?: Array<any>;
      [key: string]: any;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issue/bulk',
      method: 'POST',
      data: { ...params },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getCreateIssueMetadata(
    params?: {
      projectIds?: Array<string>;
      projectKeys?: Array<string>;
      issuetypeIds?: Array<string>;
      issuetypeNames?: Array<string>;
      expand?: string;
    },
    callback?: Callback<IssueCreateMetadata>,
  ): Promise<IssueCreateMetadata> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issue/createmeta',
      method: 'GET',
      params: {
        projectIds: params.projectIds && params.projectIds.join(','),
        projectKeys: params.projectKeys && params.projectKeys.join(','),
        issuetypeIds: params.issuetypeIds && params.issuetypeIds.join(','),
        issuetypeNames:
          params.issuetypeNames && params.issuetypeNames.join(','),
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssue(
    params: {
      issueIdOrKey: string;
      fields?: Array<string>;
      fieldsByKeys?: boolean;
      expand?: string;
      properties?: Array<string>;
      updateHistory?: boolean;
    },
    callback?: Callback<IssueBean>,
  ): Promise<IssueBean> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}`,
      method: 'GET',
      params: {
        fields: params.fields && params.fields.join(','),
        fieldsByKeys: params.fieldsByKeys,
        expand: params.expand,
        properties: params.properties && params.properties.join(','),
        updateHistory: params.updateHistory,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async editIssue(
    params: {
      issueIdOrKey: string;
      notifyUsers?: boolean;
      overrideScreenSecurity?: boolean;
      overrideEditableFlag?: boolean;
      transition?: any;
      fields?: any;
      update?: any;
      historyMetadata?: any;
      properties?: Array<any>;
      [key: string]: any;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}`,
      method: 'PUT',
      params: {
        notifyUsers: params.notifyUsers,
        overrideScreenSecurity: params.overrideScreenSecurity,
        overrideEditableFlag: params.overrideEditableFlag,
      },
      data: {
        ...params,
        issueIdOrKey: undefined,
        notifyUsers: undefined,
        overrideScreenSecurity: undefined,
        overrideEditableFlag: undefined,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteIssue(
    params: {
      issueIdOrKey: string;
      deleteSubtasks?: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}`,
      method: 'DELETE',
      params: {
        deleteSubtasks: params.deleteSubtasks,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async assignIssue(
    params: {
      issueIdOrKey: string;
      self?: string;
      key?: string;
      accountId?: string;
      accountType?: string;
      name?: string;
      emailAddress?: string;
      avatarUrls?: any;
      displayName?: string;
      active?: boolean;
      timeZone?: string;
      locale?: string;
      groups?: any;
      applicationRoles?: any;
      expand?: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/assignee`,
      method: 'PUT',
      data: {
        self: params.self,
        key: params.key,
        accountId: params.accountId,
        accountType: params.accountType,
        name: params.name,
        emailAddress: params.emailAddress,
        avatarUrls: params.avatarUrls,
        displayName: params.displayName,
        active: params.active,
        timeZone: params.timeZone,
        locale: params.locale,
        groups: params.groups,
        applicationRoles: params.applicationRoles,
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getChangeLogs(
    params: {
      issueIdOrKey: string;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback<PageBeanChangelog>,
  ): Promise<PageBeanChangelog> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/changelog`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getEditIssueMetadata(
    params: {
      issueIdOrKey: string;
      overrideScreenSecurity?: boolean;
      overrideEditableFlag?: boolean;
    },
    callback?: Callback<IssueUpdateMetadata>,
  ): Promise<IssueUpdateMetadata> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/editmeta`,
      method: 'GET',
      params: {
        overrideScreenSecurity: params.overrideScreenSecurity,
        overrideEditableFlag: params.overrideEditableFlag,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async sendNotificationForIssue(
    params: {
      issueIdOrKey: string;
      subject?: string;
      textBody?: string;
      htmlBody?: string;
      to?: any;
      restrict?: any;
      [key: string]: any;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/notify`,
      method: 'POST',
      data: { ...params, issueIdOrKey: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getTransitions(
    params: {
      issueIdOrKey: string;
      expand?: string;
      transitionId?: string;
      skipRemoteOnlyCondition?: boolean;
      includeUnavailableTransitions?: boolean;
      sortByOpsBarAndStatus?: boolean;
    },
    callback?: Callback<Transitions>,
  ): Promise<Transitions> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/transitions`,
      method: 'GET',
      params: {
        expand: params.expand,
        transitionId: params.transitionId,
        skipRemoteOnlyCondition: params.skipRemoteOnlyCondition,
        includeUnavailableTransitions: params.includeUnavailableTransitions,
        sortByOpsBarAndStatus: params.sortByOpsBarAndStatus,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async transitionIssue(
    params: {
      issueIdOrKey: string;
      transition?: any;
      fields?: any;
      update?: any;
      historyMetadata?: any;
      properties?: Array<any>;
      [key: string]: any;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/transitions`,
      method: 'POST',
      data: { ...params, issueIdOrKey: undefined },
    };

    return this.client.sendRequest(request, callback);
  }
}
