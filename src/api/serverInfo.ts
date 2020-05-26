import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class ServerInfo {
  constructor(private readonly client: Sender) { }

  public async getJiraInstanceInfo(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/serverInfo',
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }
}
