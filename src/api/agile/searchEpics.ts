import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';

export class SearchEpics {
  constructor(private readonly client: Client) { }

  async searchEpics(parameters?: {
    maxResults?: number;
    excludeDone?: boolean;
    query?: string;
    projectKey?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/agile/1.0/epic/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
