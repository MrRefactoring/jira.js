import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import {
  PageBeanWorkflowScheme as PageBeanWorkflowSchemeResponse, WorkflowScheme as WorkflowSchemeResponse, DefaultWorkflow as DefaultWorkflowResponse, IssueTypeWorkflowMapping as IssueTypeWorkflowMappingResponse, IssueTypesWorkflowMapping as IssueTypesWorkflowMappingResponse,
} from '../../models/v2';

export class WorkflowSchemes {
  constructor(private readonly client: Client) { }

  async getAllWorkflowSchemes(parameters?: {
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanWorkflowSchemeResponse>): Promise<PageBeanWorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflowscheme',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createWorkflowScheme(parameters?: any, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflowscheme',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getWorkflowScheme(parameters: {
    id: number;
    returnDraftIfExists?: boolean;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateWorkflowScheme(parameters: {
    id: number;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteWorkflowScheme(parameters: {
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getDefaultWorkflow(parameters: {
    id: number;
    returnDraftIfExists?: boolean;
  }, callback?: Callback<DefaultWorkflowResponse>): Promise<DefaultWorkflowResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateDefaultWorkflow(parameters: {
    id: number;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteDefaultWorkflow(parameters: {
    id: number;
    updateDraftIfNeeded?: boolean;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getWorkflowSchemeIssueType(parameters: {
    id: number;
    issueType: string;
    returnDraftIfExists?: boolean;
  }, callback?: Callback<IssueTypeWorkflowMappingResponse>): Promise<IssueTypeWorkflowMappingResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setWorkflowSchemeIssueType(parameters: {
    id: number;
    issueType: string;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteWorkflowSchemeIssueType(parameters: {
    id: number;
    issueType: string;
    updateDraftIfNeeded?: boolean;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getWorkflow(parameters: {
    id: number;
    workflowName?: string;
    returnDraftIfExists?: boolean;
  }, callback?: Callback<IssueTypesWorkflowMappingResponse>): Promise<IssueTypesWorkflowMappingResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateWorkflowMapping(parameters: {
    id: number;
    workflowName: string;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteWorkflowMapping(parameters: {
    id: number;
    workflowName: string;
    updateDraftIfNeeded?: boolean;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
