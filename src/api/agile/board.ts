import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { SearchResultsBean as SearchResultsBeanResponse } from '../../models/agile';

export class Board {
  constructor(private readonly client: Client) { }

  async getBoardByFilterId(parameters: {
    filterId: number;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/filter/${parameters.filterId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getBoard(parameters: {
    boardId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteBoard(parameters: {
    boardId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssuesForBacklog(parameters: {
    boardId: number;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback<SearchResultsBeanResponse>): Promise<SearchResultsBeanResponse> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/backlog`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getConfiguration(parameters: {
    boardId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/configuration`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getEpics(parameters: {
    boardId: number;
    startAt?: number;
    maxResults?: number;
    done?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/epic`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssuesWithoutEpicForBoard(parameters: {
    boardId: number;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/epic/none/issue`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getBoardIssuesForEpic(parameters: {
    boardId: number;
    epicId: number;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/epic/${parameters.epicId}/issue`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFeaturesForBoard(parameters: {
    boardId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/features`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async toggleFeatures(parameters: {
    boardId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/features`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssuesForBoard(parameters: {
    boardId: number;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback<SearchResultsBeanResponse>): Promise<SearchResultsBeanResponse> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/issue`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async moveIssuesToBoard(parameters: {
    boardId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/issue`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProjects(parameters: {
    boardId: number;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/project`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProjectsFull(parameters: {
    boardId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/project/full`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getBoardPropertyKeys(parameters: {
    boardId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getBoardProperty(parameters: {
    boardId: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setBoardProperty(parameters: {
    boardId: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteBoardProperty(parameters: {
    boardId: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllQuickFilters(parameters: {
    boardId: number;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/quickfilter`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getQuickFilter(parameters: {
    boardId: number;
    quickFilterId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/quickfilter/${parameters.quickFilterId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getReportsForBoard(parameters: {
    boardId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/reports`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllSprints(parameters: {
    boardId: number;
    startAt?: number;
    maxResults?: number;
    state?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/sprint`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getBoardIssuesForSprint(parameters: {
    boardId: number;
    sprintId: number;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/sprint/${parameters.sprintId}/issue`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAllVersions(parameters: {
    boardId: number;
    startAt?: number;
    maxResults?: number;
    released?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/board/${parameters.boardId}/version`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
