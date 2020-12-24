import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowSchemeDrafts {
  constructor(private client: Client) { }
  async createWorkflowSchemeDraftFromParent<T = Models.WorkflowScheme>(parameters: Parameters.CreateWorkflowSchemeDraftFromParent, callback: Callback<T>): Promise<void>;
  async createWorkflowSchemeDraftFromParent<T = Models.WorkflowScheme>(parameters: Parameters.CreateWorkflowSchemeDraftFromParent, callback?: undefined): Promise<T>;
  async createWorkflowSchemeDraftFromParent<T = Models.WorkflowScheme>(parameters: Parameters.CreateWorkflowSchemeDraftFromParent, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/createdraft`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.GetWorkflowSchemeDraft, callback: Callback<T>): Promise<void>;
  async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.GetWorkflowSchemeDraft, callback?: undefined): Promise<T>;
  async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.GetWorkflowSchemeDraft, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowSchemeDraft, callback: Callback<T>): Promise<void>;
  async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowSchemeDraft, callback?: undefined): Promise<T>;
  async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: Parameters.UpdateWorkflowSchemeDraft, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        defaultWorkflow: parameters.defaultWorkflow,
        issueTypeMappings: parameters.issueTypeMappings,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteWorkflowSchemeDraft<T = void>(parameters: Parameters.DeleteWorkflowSchemeDraft, callback: Callback<T>): Promise<void>;
  async deleteWorkflowSchemeDraft<T = void>(parameters: Parameters.DeleteWorkflowSchemeDraft, callback?: undefined): Promise<T>;
  async deleteWorkflowSchemeDraft<T = void>(parameters: Parameters.DeleteWorkflowSchemeDraft, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: Parameters.GetDraftDefaultWorkflow, callback: Callback<T>): Promise<void>;
  async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: Parameters.GetDraftDefaultWorkflow, callback?: undefined): Promise<T>;
  async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: Parameters.GetDraftDefaultWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftDefaultWorkflow, callback: Callback<T>): Promise<void>;
  async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftDefaultWorkflow, callback?: undefined): Promise<T>;
  async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftDefaultWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'PUT',
      data: {
        workflow: parameters.workflow,
        updateDraftIfNeeded: parameters.updateDraftIfNeeded,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.DeleteDraftDefaultWorkflow, callback: Callback<T>): Promise<void>;
  async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.DeleteDraftDefaultWorkflow, callback?: undefined): Promise<T>;
  async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: Parameters.DeleteDraftDefaultWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: Parameters.GetWorkflowSchemeDraftIssueType, callback: Callback<T>): Promise<void>;
  async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: Parameters.GetWorkflowSchemeDraftIssueType, callback?: undefined): Promise<T>;
  async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: Parameters.GetWorkflowSchemeDraftIssueType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.SetWorkflowSchemeDraftIssueType, callback: Callback<T>): Promise<void>;
  async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.SetWorkflowSchemeDraftIssueType, callback?: undefined): Promise<T>;
  async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.SetWorkflowSchemeDraftIssueType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'PUT',
      data: parameters.body,
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.DeleteWorkflowSchemeDraftIssueType, callback: Callback<T>): Promise<void>;
  async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.DeleteWorkflowSchemeDraftIssueType, callback?: undefined): Promise<T>;
  async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: Parameters.DeleteWorkflowSchemeDraftIssueType, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: Parameters.GetDraftWorkflow, callback: Callback<T>): Promise<void>;
  async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: Parameters.GetDraftWorkflow, callback?: undefined): Promise<T>;
  async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: Parameters.GetDraftWorkflow, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'GET',
      params: {
        workflowName: parameters.workflowName,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftWorkflowMapping, callback: Callback<T>): Promise<void>;
  async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftWorkflowMapping, callback?: undefined): Promise<T>;
  async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(parameters: Parameters.UpdateDraftWorkflowMapping, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
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
  async deleteDraftWorkflowMapping<T = any>(parameters: Parameters.DeleteDraftWorkflowMapping, callback: Callback<T>): Promise<void>;
  async deleteDraftWorkflowMapping<T = any>(parameters: Parameters.DeleteDraftWorkflowMapping, callback?: undefined): Promise<T>;
  async deleteDraftWorkflowMapping<T = any>(parameters: Parameters.DeleteDraftWorkflowMapping, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
      method: 'DELETE',
      params: {
        workflowName: parameters.workflowName,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
