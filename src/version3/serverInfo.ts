import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ServerInfo {
  constructor(private client: Client) { }
  async getServerInfo<T = Models.ServerInformation>(callback?: Callback<T>): Promise<void>;
  async getServerInfo<T = Models.ServerInformation>(callback?: undefined): Promise<T>;
  async getServerInfo<T = Models.ServerInformation>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/serverInfo',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
