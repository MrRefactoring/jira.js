import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ScreenTabs {
  constructor(private client: Client) { }
  async getAllScreenTabs<T = any>(parameters: Parameters.GetAllScreenTabs, callback: Callback<T>): Promise<void>;
  async getAllScreenTabs<T = any>(parameters: Parameters.GetAllScreenTabs, callback?: undefined): Promise<T>;
  async getAllScreenTabs<T = any>(parameters: Parameters.GetAllScreenTabs, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screens/${parameters.screenId}/tabs`,
      method: 'GET',
      params: {
        projectKey: parameters.projectKey,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addScreenTab<T = Models.ScreenableTab>(parameters: Parameters.AddScreenTab, callback: Callback<T>): Promise<void>;
  async addScreenTab<T = Models.ScreenableTab>(parameters: Parameters.AddScreenTab, callback?: undefined): Promise<T>;
  async addScreenTab<T = Models.ScreenableTab>(parameters: Parameters.AddScreenTab, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screens/${parameters.screenId}/tabs`,
      method: 'POST',
      data: {
        id: parameters.id,
        name: parameters.name,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async renameScreenTab<T = Models.ScreenableTab>(parameters: Parameters.RenameScreenTab, callback: Callback<T>): Promise<void>;
  async renameScreenTab<T = Models.ScreenableTab>(parameters: Parameters.RenameScreenTab, callback?: undefined): Promise<T>;
  async renameScreenTab<T = Models.ScreenableTab>(parameters: Parameters.RenameScreenTab, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
      method: 'PUT',
      data: {
        id: parameters.id,
        name: parameters.name,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteScreenTab<T = void>(parameters: Parameters.DeleteScreenTab, callback: Callback<T>): Promise<void>;
  async deleteScreenTab<T = void>(parameters: Parameters.DeleteScreenTab, callback?: undefined): Promise<T>;
  async deleteScreenTab<T = void>(parameters: Parameters.DeleteScreenTab, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async moveScreenTab<T = void>(parameters: Parameters.MoveScreenTab, callback: Callback<T>): Promise<void>;
  async moveScreenTab<T = void>(parameters: Parameters.MoveScreenTab, callback?: undefined): Promise<T>;
  async moveScreenTab<T = void>(parameters: Parameters.MoveScreenTab, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/move/${parameters.pos}`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
