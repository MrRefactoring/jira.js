import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Screens {
  constructor(private readonly client: Sender) { }

  public async getScreensForAField(
    params: {
      fieldId: string;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/field/${params.fieldId}/screens`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getIssueTypeScreenSchemeItems(
    params: {
      startAt?: number;
      maxResults?: number;
      issueTypeScreenSchemeId?: Array<number>;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescreenscheme/mapping',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        issueTypeScreenSchemeId:
          params.issueTypeScreenSchemeId &&
          params.issueTypeScreenSchemeId.join(',')
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getIssueTypeScreenSchemesForProjects(
    params?: {
      startAt?: number;
      maxResults?: number;
      projectId?: Array<number>;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuetypescreenscheme/project',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        projectId: params.projectId && params.projectId.join(',')
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAllScreens(
    params: {
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/screens',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async addFieldToDefaultScreen(
    params: {
      fieldId: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/addToDefault/${params.fieldId}`,
      method: 'POST'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAvailableScreenFields(
    params: {
      screenId: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/availableFields`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAllScreenTabs(
    params: {
      screenId: number;
      projectKey?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs`,
      method: 'GET',
      params: {
        projectKey: params.projectKey
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async createScreenTab(
    params: {
      screenId: number;
      id?: number;
      name: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs`,
      method: 'POST',
      data: {
        id: params.id,
        name: params.name
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async updateScreenTab(
    params: {
      screenId: number;
      tabId: number;
      id?: number;
      name: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}`,
      method: 'PUT',
      data: {
        id: params.id,
        name: params.name
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteScreenTab(
    params: {
      screenId: number;
      tabId: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}`,
      method: 'DELETE'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAllScreenTabFields(
    params: {
      screenId: number;
      tabId: number;
      projectKey?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}/fields`,
      method: 'GET',
      params: {
        projectKey: params.projectKey
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async addScreenTabField(
    params: {
      screenId: number;
      tabId: number;
      fieldId: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}/fields`,
      method: 'POST',
      data: {
        fieldId: params.fieldId
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async removeScreenTabField(
    params: {
      screenId: number;
      tabId: number;
      id: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}/fields/${params.id}`,
      method: 'DELETE'
    };
    return this.client.sendRequest(request, callback);
  }

  public async moveScreenTabField(
    params: {
      screenId: number;
      tabId: number;
      id: string;
      after?: string;
      position?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}/fields/${params.id}/move`,
      method: 'POST',
      data: {
        after: params.after,
        position: params.position
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async moveScreenTab(
    params: {
      screenId: number;
      tabId: number;
      pos: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/screens/${params.screenId}/tabs/${params.tabId}/move/${params.pos}`,
      method: 'POST'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAllScreenSchemes(
    params: {
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/screenscheme',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults
      }
    };
    return this.client.sendRequest(request, callback);
  }
}
