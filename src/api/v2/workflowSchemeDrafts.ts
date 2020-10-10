import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import {
  WorkflowScheme as WorkflowSchemeResponse, DefaultWorkflow as DefaultWorkflowResponse, IssueTypeWorkflowMapping as IssueTypeWorkflowMappingResponse, IssueTypesWorkflowMapping as IssueTypesWorkflowMappingResponse,
} from '../../models/v2';

export class WorkflowSchemeDrafts {
  constructor(private readonly client: Client) { }

  async createWorkflowSchemeDraftFromParent(parameters: {
    id: number;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/createdraft`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getWorkflowSchemeDraft(parameters: {
    id: number;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateWorkflowSchemeDraft(parameters: {
    id: number;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteWorkflowSchemeDraft(parameters: {
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getDraftDefaultWorkflow(parameters: {
    id: number;
  }, callback?: Callback<DefaultWorkflowResponse>): Promise<DefaultWorkflowResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateDraftDefaultWorkflow(parameters: {
    id: number;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteDraftDefaultWorkflow(parameters: {
    id: number;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getWorkflowSchemeDraftIssueType(parameters: {
    id: number;
    issueType: string;
  }, callback?: Callback<IssueTypeWorkflowMappingResponse>): Promise<IssueTypeWorkflowMappingResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setWorkflowSchemeDraftIssueType(parameters: {
    id: number;
    issueType: string;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteWorkflowSchemeDraftIssueType(parameters: {
    id: number;
    issueType: string;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getDraftWorkflow(parameters: {
    id: number;
    workflowName?: string;
  }, callback?: Callback<IssueTypesWorkflowMappingResponse>): Promise<IssueTypesWorkflowMappingResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateDraftWorkflowMapping(parameters: {
    id: number;
    workflowName: string;
  }, callback?: Callback<WorkflowSchemeResponse>): Promise<WorkflowSchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteDraftWorkflowMapping(parameters: {
    id: number;
    workflowName: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
