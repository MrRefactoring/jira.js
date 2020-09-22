import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class WorkflowSchemes {
  constructor(private readonly client: Sender) {}

  public async getAllWorkflowSchemes(
    params?: {
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflowscheme',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async createWorkflowScheme(
    params?: {
      id?: number;
      name?: string;
      description?: string;
      defaultWorkflow?: string;
      issueTypeMappings?: any;
      originalDefaultWorkflow?: string;
      originalIssueTypeMappings?: any;
      draft?: boolean;
      lastModifiedUser?: any;
      lastModified?: string;
      self?: string;
      updateDraftIfNeeded?: boolean;
      issueTypes?: any;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflowscheme',
      method: 'POST',
      data: {
        id: params.id,
        name: params.name,
        description: params.description,
        defaultWorkflow: params.defaultWorkflow,
        issueTypeMappings: params.issueTypeMappings,
        originalDefaultWorkflow: params.originalDefaultWorkflow,
        originalIssueTypeMappings: params.originalIssueTypeMappings,
        draft: params.draft,
        lastModifiedUser: params.lastModifiedUser,
        lastModified: params.lastModified,
        self: params.self,
        updateDraftIfNeeded: params.updateDraftIfNeeded,
        issueTypes: params.issueTypes,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getWorkflowScheme(
    params: {
      id: number;
      returnDraftIfExists?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}`,
      method: 'GET',
      params: {
        returnDraftIfExists: params.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateWorkflowScheme(
    params: {
      id: number;
      name?: string;
      description?: string;
      defaultWorkflow?: string;
      issueTypeMappings?: any;
      originalDefaultWorkflow?: string;
      originalIssueTypeMappings?: any;
      draft?: boolean;
      lastModifiedUser?: any;
      lastModified?: string;
      self?: string;
      updateDraftIfNeeded?: boolean;
      issueTypes?: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}`,
      method: 'PUT',
      data: {
        id: params.id,
        name: params.name,
        description: params.description,
        defaultWorkflow: params.defaultWorkflow,
        issueTypeMappings: params.issueTypeMappings,
        originalDefaultWorkflow: params.originalDefaultWorkflow,
        originalIssueTypeMappings: params.originalIssueTypeMappings,
        draft: params.draft,
        lastModifiedUser: params.lastModifiedUser,
        lastModified: params.lastModified,
        self: params.self,
        updateDraftIfNeeded: params.updateDraftIfNeeded,
        issueTypes: params.issueTypes,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteWorkflowScheme(
    params: {
      id: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getDefaultWorkflow(
    params: {
      id: number;
      returnDraftIfExists?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/default`,
      method: 'GET',
      params: {
        returnDraftIfExists: params.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateDefaultWorkflow(
    params: {
      id: number;
      workflow: string;
      updateDraftIfNeeded?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/default`,
      method: 'PUT',
      data: {
        workflow: params.workflow,
        updateDraftIfNeeded: params.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteDefaultWorkflow(
    params: {
      id: number;
      updateDraftIfNeeded?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/default`,
      method: 'DELETE',
      params: {
        updateDraftIfNeeded: params.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getWorkflowForIssueTypeInWorkflowScheme(
    params: {
      id: number;
      issueType: string;
      returnDraftIfExists?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/issuetype/${params.issueType}`,
      method: 'GET',
      params: {
        returnDraftIfExists: params.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async setWorkflowForIssueTypeInWorkflowScheme(
    params: {
      id: number;
      issueType: string;
      workflow?: string;
      updateDraftIfNeeded?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/issuetype/${params.issueType}`,
      method: 'PUT',
      data: {
        issueType: params.issueType,
        workflow: params.workflow,
        updateDraftIfNeeded: params.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteWorkflowForIssueTypeInWorkflowScheme(
    params: {
      id: number;
      issueType: string;
      updateDraftIfNeeded?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/issuetype/${params.issueType}`,
      method: 'DELETE',
      params: {
        updateDraftIfNeeded: params.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueTypesForWorkflowsInWorkflowScheme(
    params: {
      id: number;
      workflowName?: string;
      returnDraftIfExists?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/workflow`,
      method: 'GET',
      params: {
        workflowName: params.workflowName,
        returnDraftIfExists: params.returnDraftIfExists,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async setIssueTypesForWorkflowInWorkflowScheme(
    params: {
      id: number;
      workflowName: string;
      workflow?: string;
      issueTypes?: Array<string>;
      defaultMapping?: boolean;
      updateDraftIfNeeded?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/workflow`,
      method: 'PUT',
      params: {
        workflowName: params.workflowName,
      },
      data: {
        workflow: params.workflow,
        issueTypes: params.issueTypes,
        defaultMapping: params.defaultMapping,
        updateDraftIfNeeded: params.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteIssueTypesForWorkflowInWorkflowScheme(
    params: {
      id: number;
      workflowName: string;
      updateDraftIfNeeded?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/workflow`,
      method: 'DELETE',
      params: {
        workflowName: params.workflowName,
        updateDraftIfNeeded: params.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
