import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class ProjectRoleActors {
  constructor(private readonly client: Sender) {}

  public async setActorsForProjectRole(
    params: {
      projectIdOrKey: string;
      id: number;
      categorisedActors?: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/role/${params.id}`,
      method: 'PUT',
      data: {
        id: params.id,
        categorisedActors: params.categorisedActors
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async addActorsToProjectRole(
    params: {
      projectIdOrKey: string;
      id: number;
      user?: Array<string>;
      group?: Array<string>;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/role/${params.id}`,
      method: 'POST',
      data: {
        user: params.user,
        group: params.group
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteActorsFromProjectRole(
    params: {
      projectIdOrKey: string;
      id: number;
      user?: string;
      group?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/role/${params.id}`,
      method: 'DELETE',
      params: {
        user: params.user,
        group: params.group
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getActorsCountForProjectRole(
    params: {
      projectIdOrKey: string;
      id: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/role/${params.id}/actorCount`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getDefaultActorsForProjectRole(
    params: {
      id: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${params.id}/actors`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async addDefaultActorsToProjectRole(
    params: {
      id: number;
      user?: Array<string>;
      group?: Array<string>;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${params.id}/actors`,
      method: 'POST',
      data: {
        user: params.user,
        group: params.group
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteDefaultActorsFromProjectRole(
    params: {
      id: number;
      user?: string;
      group?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/role/${params.id}/actors`,
      method: 'DELETE',
      params: {
        user: params.user,
        group: params.group
      }
    };
    return this.client.sendRequest(request, callback);
  }
}
