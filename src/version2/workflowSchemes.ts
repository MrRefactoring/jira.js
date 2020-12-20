import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowSchemes {
  constructor(private client: Client) { }
  async getAllWorkflowSchemes<T = Models.PageBeanWorkflowScheme>(parameters?: Parameters.GetAllWorkflowSchemes, callback?: Callback<T>): Promise<void>;
  async getAllWorkflowSchemes<T = Models.PageBeanWorkflowScheme>(parameters?: Parameters.GetAllWorkflowSchemes, callback?: undefined): Promise<T>;
  async getAllWorkflowSchemes<T = Models.PageBeanWorkflowScheme>(parameters?: Parameters.GetAllWorkflowSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/workflowscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createWorkflowScheme<T = Models.WorkflowScheme>(parameters?: Parameters.CreateWorkflowScheme, callback?: Callback<T>): Promise<void>;
  async createWorkflowScheme<T = Models.WorkflowScheme>(parameters?: Parameters.CreateWorkflowScheme, callback?: undefined): Promise<T>;
  async createWorkflowScheme<T = Models.WorkflowScheme>(parameters?: Parameters.CreateWorkflowScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/workflowscheme',
      method: 'POST',
      data: {
        id: parameters?.id,
        name: parameters?.name,
        description: parameters?.description,
        defaultWorkflow: parameters?.defaultWorkflow,
        issueTypeMappings: parameters?.issueTypeMappings,
        originalDefaultWorkflow: parameters?.originalDefaultWorkflow,
        originalIssueTypeMappings: parameters?.originalIssueTypeMappings,
        draft: parameters?.draft,
        lastModifiedUser: parameters?.lastModifiedUser,
        lastModified: parameters?.lastModified,
        self: parameters?.self,
        updateDraftIfNeeded: parameters?.updateDraftIfNeeded,
        issueTypes: parameters?.issueTypes,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getWorkflowScheme<T = Models.WorkflowScheme>(parameters: Parameters.GetWorkflowScheme, callback: Callback<T>): Promise<void>;
  async getWorkflowScheme<T = Models.WorkflowScheme>(parameters: Parameters.GetWorkflowScheme, callback?: undefined): Promise<T>;
  async getWorkflowScheme<T = Models.WorkflowScheme>(parameters: Parameters.GetWorkflowScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}`,
      method: 'GET',
      params: {
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateWorkflowScheme<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowScheme, callback: Callback<T>): Promise<void>;
  async updateWorkflowScheme<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowScheme, callback?: undefined): Promise<T>;
  async updateWorkflowScheme<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}`,
      method: 'PUT',
      data: parameters.body,
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteWorkflowScheme<T = void>(parameters: Parameters.DeleteWorkflowScheme, callback: Callback<T>): Promise<void>;
  async deleteWorkflowScheme<T = void>(parameters: Parameters.DeleteWorkflowScheme, callback?: undefined): Promise<T>;
  async deleteWorkflowScheme<T = void>(parameters: Parameters.DeleteWorkflowScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: Parameters.GetDefaultWorkflow, callback: Callback<T>): Promise<void>;
  async getDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: Parameters.GetDefaultWorkflow, callback?: undefined): Promise<T>;
  async getDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: Parameters.GetDefaultWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
      method: 'GET',
      params: {
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDefaultWorkflow, callback: Callback<T>): Promise<void>;
  async updateDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDefaultWorkflow, callback?: undefined): Promise<T>;
  async updateDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDefaultWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
      method: 'PUT',
      data: {
        workflow: parameters.workflow,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.DeleteDefaultWorkflow, callback: Callback<T>): Promise<void>;
  async deleteDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.DeleteDefaultWorkflow, callback?: undefined): Promise<T>;
  async deleteDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.DeleteDefaultWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
      method: 'DELETE',
      params: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: Parameters.GetWorkflowSchemeIssueType, callback: Callback<T>): Promise<void>;
  async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: Parameters.GetWorkflowSchemeIssueType, callback?: undefined): Promise<T>;
  async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: Parameters.GetWorkflowSchemeIssueType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'GET',
      params: {
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: Parameters.SetWorkflowSchemeIssueType, callback: Callback<T>): Promise<void>;
  async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: Parameters.SetWorkflowSchemeIssueType, callback?: undefined): Promise<T>;
  async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: Parameters.SetWorkflowSchemeIssueType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'PUT',
      data: parameters.body,
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: Parameters.DeleteWorkflowSchemeIssueType, callback: Callback<T>): Promise<void>;
  async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: Parameters.DeleteWorkflowSchemeIssueType, callback?: undefined): Promise<T>;
  async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: Parameters.DeleteWorkflowSchemeIssueType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
      method: 'DELETE',
      params: {
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: Parameters.GetWorkflow, callback: Callback<T>): Promise<void>;
  async getWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: Parameters.GetWorkflow, callback?: undefined): Promise<T>;
  async getWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: Parameters.GetWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
      method: 'GET',
      params: {
        workflowName: parameters.workflowName,
        returnDraftIfExists: parameters.returnDraftIfExists,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateWorkflowMapping<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowMapping, callback: Callback<T>): Promise<void>;
  async updateWorkflowMapping<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowMapping, callback?: undefined): Promise<T>;
  async updateWorkflowMapping<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowMapping, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
      method: 'PUT',
      params: {
        workflowName: parameters.workflowName,
      },
      data: {
        workflow: parameters.workflow,
        issueTypes: parameters.issueTypes,
        defaultMapping: parameters.defaultMapping,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteWorkflowMapping<T = any>(parameters: Parameters.DeleteWorkflowMapping, callback: Callback<T>): Promise<void>;
  async deleteWorkflowMapping<T = any>(parameters: Parameters.DeleteWorkflowMapping, callback?: undefined): Promise<T>;
  async deleteWorkflowMapping<T = any>(parameters: Parameters.DeleteWorkflowMapping, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
      method: 'DELETE',
      params: {
        workflowName: parameters.workflowName,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
