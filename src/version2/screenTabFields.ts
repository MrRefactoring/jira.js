import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ScreenTabFields {
  constructor(private client: Client) { }
  async getAllScreenTabFields<T = any>(parameters: Parameters.GetAllScreenTabFields, callback: Callback<T>): Promise<void>;
  async getAllScreenTabFields<T = any>(parameters: Parameters.GetAllScreenTabFields, callback?: undefined): Promise<T>;
  async getAllScreenTabFields<T = any>(parameters: Parameters.GetAllScreenTabFields, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
      method: 'GET',
      params: {
        projectKey: parameters.projectKey,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addScreenTabField<T = Models.ScreenableField>(parameters: Parameters.AddScreenTabField, callback: Callback<T>): Promise<void>;
  async addScreenTabField<T = Models.ScreenableField>(parameters: Parameters.AddScreenTabField, callback?: undefined): Promise<T>;
  async addScreenTabField<T = Models.ScreenableField>(parameters: Parameters.AddScreenTabField, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
      method: 'POST',
      data: {
        fieldId: parameters.fieldId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeScreenTabField<T = void>(parameters: Parameters.RemoveScreenTabField, callback: Callback<T>): Promise<void>;
  async removeScreenTabField<T = void>(parameters: Parameters.RemoveScreenTabField, callback?: undefined): Promise<T>;
  async removeScreenTabField<T = void>(parameters: Parameters.RemoveScreenTabField, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async moveScreenTabField<T = void>(parameters: Parameters.MoveScreenTabField, callback: Callback<T>): Promise<void>;
  async moveScreenTabField<T = void>(parameters: Parameters.MoveScreenTabField, callback?: undefined): Promise<T>;
  async moveScreenTabField<T = void>(parameters: Parameters.MoveScreenTabField, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}/move`,
      method: 'POST',
      data: {
        after: parameters.after,
        position: parameters.position,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
