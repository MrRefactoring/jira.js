import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class WorkflowSchemeProjectAssociations {
  constructor(private readonly client: Sender) {}

  public async getWorkflowSchemeProjectAssociations(
    params: {
      projectId: Array<number>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflowscheme/project',
      method: 'GET',
      params: {
        projectId: params?.projectId?.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async assignWorkflowSchemeToProject(
    params: {
      workflowSchemeId: string;
      projectId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflowscheme/project',
      method: 'PUT',
      data: {
        workflowSchemeId: params?.workflowSchemeId,
        projectId: params?.projectId,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
