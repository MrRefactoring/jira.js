import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { ContainerOfWorkflowSchemeAssociations } from '../schemas';
export class WorkflowSchemeProjectAssociations {
  constructor(private readonly client: Sender) {}

  public async getWorkflowSchemeProjectAssociations(
    params: {
      projectId: Array<number>;
    },
    callback?: Callback<ContainerOfWorkflowSchemeAssociations>,
  ): Promise<ContainerOfWorkflowSchemeAssociations> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/workflowscheme/project',
      method: 'GET',
      params: {
        projectId: params.projectId && params.projectId.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
