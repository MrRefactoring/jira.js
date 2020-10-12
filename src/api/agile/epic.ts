import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';

export class Epic {
  constructor(private readonly client: Client) { }

  async getIssuesWithoutEpic(parameters?: {
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/agile/1.0/epic/none/issue',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async removeIssuesFromEpic(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/agile/1.0/epic/none/issue',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getEpic(parameters: {
    epicIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async partiallyUpdateEpic(parameters: {
    epicIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssuesForEpic(parameters: {
    epicIdOrKey: string;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async moveIssuesToEpic(parameters: {
    epicIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async rankEpics(parameters: {
    epicIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/epic/${parameters.epicIdOrKey}/rank`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }
}
