import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';

export class Sprint {
  constructor(private readonly client: Client) { }

  async createSprint(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/agile/1.0/sprint',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getSprint(parameters: {
    sprintId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async partiallyUpdateSprint(parameters: {
    sprintId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateSprint(parameters: {
    sprintId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteSprint(parameters: {
    sprintId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssuesForSprint(parameters: {
    sprintId: number;
    startAt?: number;
    maxResults?: number;
    jql?: string;
    validateQuery?: boolean;
    fields?: string[];
    expand?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/issue`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async moveIssuesToSprintAndRank(parameters: {
    sprintId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/issue`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getPropertiesKeys(parameters: {
    sprintId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getProperty(parameters: {
    sprintId: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setProperty(parameters: {
    sprintId: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteProperty(parameters: {
    sprintId: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async swapSprint(parameters: {
    sprintId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/swap`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
