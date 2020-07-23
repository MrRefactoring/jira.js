import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class WorkflowSchemeDrafts {
  constructor(private readonly client: Sender) { }

  public async createDraftWorkflowScheme(
    params: {
      id: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/createdraft`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getDraftWorkflowScheme(
    params: {
      id: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/draft`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateDraftWorkflowScheme(
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
      url: `/rest/api/2/workflowscheme/${params.id}/draft`,
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

  public async deleteDraftWorkflowScheme(
    params: {
      id: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/draft`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getDraftDefaultWorkflow(
    params: {
      id: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/draft/default`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateDraftDefaultWorkflow(
    params: {
      id: number;
      workflow: string;
      updateDraftIfNeeded?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/draft/default`,
      method: 'PUT',
      data: {
        workflow: params.workflow,
        updateDraftIfNeeded: params.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteDraftDefaultWorkflow(
    params: {
      id: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/draft/default`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getWorkflowForIssueTypeInDraftWorkflowScheme(
    params: {
      id: number;
      issueType: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/draft/issuetype/${params.issueType}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async setWorkflowForIssueTypeInDraftWorkflowScheme(
    params: {
      id: number;
      issueType: string;
      workflow?: string;
      updateDraftIfNeeded?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/draft/issuetype/${params.issueType}`,
      method: 'PUT',
      data: {
        issueType: params.issueType,
        workflow: params.workflow,
        updateDraftIfNeeded: params.updateDraftIfNeeded,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteWorkflowForIssueTypeInDraftWorkflowScheme(
    params: {
      id: number;
      issueType: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/draft/issuetype/${params.issueType}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueTypesForWorkflowsInDraftWorkflowScheme(
    params: {
      id: number;
      workflowName?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/draft/workflow`,
      method: 'GET',
      params: {
        workflowName: params.workflowName,
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
      url: `/rest/api/2/workflowscheme/${params.id}/draft/workflow`,
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

  public async deleteIssueTypesForWorkflowInDraftWorkflowScheme(
    params: {
      id: number;
      workflowName: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${params.id}/draft/workflow`,
      method: 'DELETE',
      params: {
        workflowName: params.workflowName,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
