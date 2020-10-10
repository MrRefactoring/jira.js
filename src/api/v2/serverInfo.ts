import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { ServerInformation as ServerInformationResponse } from '../../models/v2';

export class ServerInfo {
  constructor(private readonly client: Client) { }

  async getServerInfo(parameters?: any, callback?: Callback<ServerInformationResponse>): Promise<ServerInformationResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/serverInfo',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
