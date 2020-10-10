import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';

export class Boards {
  constructor(private readonly client: Client) { }

  async getAllBoards(parameters?: {
    startAt?: number;
    maxResults?: number;
    type?: string;
    name?: string;
    projectKeyOrId?: string;
    accountIdLocation?: string;
    projectLocation?: string;
    includePrivate?: boolean;
    negateLocationFiltering?: boolean;
    orderBy?: string;
    expand?: string;
    filterId?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/agile/1.0/board',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createBoard(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/agile/1.0/board',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
