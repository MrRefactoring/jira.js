import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { SecuritySchemes as SecuritySchemesResponse, SecurityScheme as SecuritySchemeResponse } from '../../models/v2';

export class IssueSecuritySchemes {
  constructor(private readonly client: Client) { }

  async getIssueSecuritySchemes(parameters?: any, callback?: Callback<SecuritySchemesResponse>): Promise<SecuritySchemesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issuesecurityschemes',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueSecurityScheme(parameters: {
    id: number;
  }, callback?: Callback<SecuritySchemeResponse>): Promise<SecuritySchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
