import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class Board {
  constructor(private readonly client: Sender) { }

  public async getAllBoards(
    params?: {
      startAt?: number;
      maxResults?: number;
      type?: string;
      name?: string;
      projectKeyOrId?: string;
      accountIdLocation?: string;
      userkeyLocation?: string;
      usernameLocation?: string;
      projectLocation?: string;
      includePrivate?: boolean;
      negateLocationFiltering?: boolean;
      orderBy?: string;
      expand?: string;
      filterId?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/agile/1.0/board',
      method: 'GET',
      params: {
        startAt: params?.startAt,
        maxResults: params?.maxResults,
        type: params?.type,
        name: params?.name,
        projectKeyOrId: params?.projectKeyOrId,
        accountIdLocation: params?.accountIdLocation,
        userkeyLocation: params?.userkeyLocation,
        usernameLocation: params?.usernameLocation,
        projectLocation: params?.projectLocation,
        includePrivate: params?.includePrivate,
        negateLocationFiltering: params?.negateLocationFiltering,
        orderBy: params?.orderBy,
        expand: params?.expand,
        filterId: params?.filterId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async createBoard(
    params: {
      name: string;
      type: 'scrum' | 'kanban';
      filterId: number;
      location?: {
        type: string;
        projectKeyOrId: string;
      };
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/agile/1.0/board',
      method: 'POST',
      data: { ...params },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getBoardByFilterId(
    params: {
      filterId: number;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/filter/${params.filterId}`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getBoard(
    params: {
      boardId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteBoard(
    params: {
      boardId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssuesForBacklog(
    params: {
      boardId: number;
      startAt?: number;
      maxResults?: number;
      jql?: string;
      validateQuery?: boolean;
      fields?: Array<string>;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/backlog`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        jql: params.jql,
        validateQuery: params.validateQuery,
        fields: params.fields && params.fields.join(','),
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getConfiguration(
    params: {
      boardId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/configuration`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getEpics(
    params: {
      boardId: number;
      startAt?: number;
      maxResults?: number;
      done?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/epic`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        done: params.done,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssuesWithoutEpic(
    params: {
      boardId: number;
      startAt?: number;
      maxResults?: number;
      jql?: string;
      validateQuery?: boolean;
      fields?: Array<string>;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/epic/none/issue`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        jql: params.jql,
        validateQuery: params.validateQuery,
        fields: params.fields && params.fields.join(','),
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssuesForEpic(
    params: {
      boardId: number;
      epicId: number;
      startAt?: number;
      maxResults?: number;
      jql?: string;
      validateQuery?: boolean;
      fields?: Array<string>;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/epic/${params.epicId}/issue`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        jql: params.jql,
        validateQuery: params.validateQuery,
        fields: params.fields && params.fields.join(','),
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getFeaturesForBoard(
    params: {
      boardId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/features`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async toggleFeatures(
    params: {
      boardId: number;
      [key: string]: any;
      body?: {
        boardId: number;
        feature?: string;
        enabling?: boolean;
      };
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/features`,
      method: 'PUT',
      data: params.body || { ...params },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssuesForBoard(
    params: {
      boardId: number;
      startAt?: number;
      maxResults?: number;
      jql?: string;
      validateQuery?: boolean;
      fields?: Array<string>;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/issue`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        jql: params.jql,
        validateQuery: params.validateQuery,
        fields: params.fields && params.fields.join(','),
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async moveIssuesToBoard(
    params: {
      boardId: number;
      issues: Array<string>;
      rankBeforeIssue?: string;
      rankAfterIssue?: string;
      rankCustomFieldId?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/issue`,
      method: 'POST',
      data: { ...params, boardId: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getProjects(
    params: {
      boardId: number;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/project`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getProjectsFull(
    params: {
      boardId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/project/full`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getBoardPropertyKeys(
    params: {
      boardId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getBoardProperty(
    params: {
      boardId: string;
      propertyKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/properties/${params.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async setBoardProperty(
    params: {
      boardId: string;
      propertyKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/properties/${params.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteBoardProperty(
    params: {
      boardId: string;
      propertyKey: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/properties/${params.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAllQuickFilters(
    params: {
      boardId: number;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/quickfilter`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getQuickFilter(
    params: {
      boardId: number;
      quickFilterId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/quickfilter/${params.quickFilterId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getReportsForBoard(
    params: {
      boardId: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/reports`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAllSprints(
    params: {
      boardId: number;
      startAt?: number;
      maxResults?: number;
      state?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/sprint`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        state: params.state,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssuesForSprint(
    params: {
      boardId: number;
      sprintId: number;
      startAt?: number;
      maxResults?: number;
      jql?: string;
      validateQuery?: boolean;
      fields?: Array<string>;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/sprint/${params.sprintId}/issue`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        jql: params.jql,
        validateQuery: params.validateQuery,
        fields: params.fields && params.fields.join(','),
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAllVersions(
    params: {
      boardId: number;
      startAt?: number;
      maxResults?: number;
      released?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/board/${params.boardId}/version`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        released: params.released,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
