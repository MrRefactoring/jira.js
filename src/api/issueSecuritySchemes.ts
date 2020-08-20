import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { SecuritySchemes, SecurityScheme } from '../schemas';
export class IssueSecuritySchemes {
  constructor(private readonly client: Sender) {}

  public async getIssueSecuritySchemes(
    callback?: Callback<SecuritySchemes>,
  ): Promise<SecuritySchemes> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuesecurityschemes',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueSecurityScheme(
    params: {
      id: number;
    },
    callback?: Callback<SecurityScheme>,
  ): Promise<SecurityScheme> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${params.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
