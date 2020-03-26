import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class TimeTracking {
  constructor(private readonly client: Sender) { }

  public async getSelectedTimeTrackingProvider(
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/configuration/timetracking',
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async selectTimeTrackingProvider(
    params: {
      key: string;
      name?: string;
      url?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/configuration/timetracking',
      method: 'PUT',
      data: {
        key: params.key,
        name: params.name,
        url: params.url,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAllTimeTrackingProviders(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/configuration/timetracking/list',
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async getTimeTrackingSettings(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/configuration/timetracking/options',
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async setTimeTrackingSettings(
    params: {
      workingHoursPerDay: any;
      workingDaysPerWeek: any;
      timeFormat: string;
      defaultUnit: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/configuration/timetracking/options',
      method: 'PUT',
      data: {
        workingHoursPerDay: params.workingHoursPerDay,
        workingDaysPerWeek: params.workingDaysPerWeek,
        timeFormat: params.timeFormat,
        defaultUnit: params.defaultUnit,
      },
    };
    return this.client.sendRequest(request, callback);
  }
}
