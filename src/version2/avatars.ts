import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Avatars {
  constructor(private client: Client) { }
  async getAllSystemAvatars<T = Models.SystemAvatars>(parameters: Parameters.GetAllSystemAvatars, callback: Callback<T>): Promise<void>;
  async getAllSystemAvatars<T = Models.SystemAvatars>(parameters: Parameters.GetAllSystemAvatars, callback?: undefined): Promise<T>;
  async getAllSystemAvatars<T = Models.SystemAvatars>(parameters: Parameters.GetAllSystemAvatars, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/avatar/${parameters.type}/system`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAvatars<T = Models.Avatars>(parameters: Parameters.GetAvatars, callback: Callback<T>): Promise<void>;
  async getAvatars<T = Models.Avatars>(parameters: Parameters.GetAvatars, callback?: undefined): Promise<T>;
  async getAvatars<T = Models.Avatars>(parameters: Parameters.GetAvatars, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async storeAvatar<T = any>(parameters: Parameters.StoreAvatar, callback: Callback<T>): Promise<void>;
  async storeAvatar<T = any>(parameters: Parameters.StoreAvatar, callback?: undefined): Promise<T>;
  async storeAvatar<T = any>(parameters: Parameters.StoreAvatar, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
      method: 'POST',
      params: {
        x: parameters.x,
        y: parameters.y,
        size: parameters.size,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteAvatar<T = any>(parameters: Parameters.DeleteAvatar, callback: Callback<T>): Promise<void>;
  async deleteAvatar<T = any>(parameters: Parameters.DeleteAvatar, callback?: undefined): Promise<T>;
  async deleteAvatar<T = any>(parameters: Parameters.DeleteAvatar, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}/avatar/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
