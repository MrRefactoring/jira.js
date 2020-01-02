import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueSecurityLevel {
  constructor(private readonly client: Sender) {}

  public async getIssueSecurityLevel(
    params: {
      id: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/securitylevel/${params.id}`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }
}
