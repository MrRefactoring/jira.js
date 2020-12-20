import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class TimeTracking {
  constructor(private client: Client) { }
  async getSelectedTimeTrackingImplementation<T = Models.TimeTrackingProvider>(callback?: Callback<T>): Promise<void>;
  async getSelectedTimeTrackingImplementation<T = Models.TimeTrackingProvider>(callback?: undefined): Promise<T>;
  async getSelectedTimeTrackingImplementation<T = Models.TimeTrackingProvider>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/configuration/timetracking',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async selectTimeTrackingImplementation<T = any>(parameters?: Parameters.SelectTimeTrackingImplementation, callback?: Callback<T>): Promise<void>;
  async selectTimeTrackingImplementation<T = any>(parameters?: Parameters.SelectTimeTrackingImplementation, callback?: undefined): Promise<T>;
  async selectTimeTrackingImplementation<T = any>(parameters?: Parameters.SelectTimeTrackingImplementation, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/configuration/timetracking',
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAvailableTimeTrackingImplementations<T = any>(callback?: Callback<T>): Promise<void>;
  async getAvailableTimeTrackingImplementations<T = any>(callback?: undefined): Promise<T>;
  async getAvailableTimeTrackingImplementations<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/configuration/timetracking/list',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(callback?: Callback<T>): Promise<void>;
  async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(callback?: undefined): Promise<T>;
  async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/configuration/timetracking/options',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters?: Parameters.SetSharedTimeTrackingConfiguration, callback?: Callback<T>): Promise<void>;
  async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters?: Parameters.SetSharedTimeTrackingConfiguration, callback?: undefined): Promise<T>;
  async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters?: Parameters.SetSharedTimeTrackingConfiguration, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/configuration/timetracking/options',
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
