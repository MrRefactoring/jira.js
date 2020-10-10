import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { TimeTrackingProvider as TimeTrackingProviderResponse, TimeTrackingConfiguration as TimeTrackingConfigurationResponse } from '../../models/v3';

export class TimeTracking {
  constructor(private readonly client: Client) { }

  async getSelectedTimeTrackingImplementation(parameters?: any, callback?: Callback<TimeTrackingProviderResponse>): Promise<TimeTrackingProviderResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/configuration/timetracking',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async selectTimeTrackingImplementation(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/configuration/timetracking',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAvailableTimeTrackingImplementations(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/configuration/timetracking/list',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getSharedTimeTrackingConfiguration(parameters?: any, callback?: Callback<TimeTrackingConfigurationResponse>): Promise<TimeTrackingConfigurationResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/configuration/timetracking/options',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setSharedTimeTrackingConfiguration(parameters?: any, callback?: Callback<TimeTrackingConfigurationResponse>): Promise<TimeTrackingConfigurationResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/configuration/timetracking/options',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }
}
