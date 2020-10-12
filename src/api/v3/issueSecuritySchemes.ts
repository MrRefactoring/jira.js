import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { SecuritySchemes as SecuritySchemesResponse, SecurityScheme as SecuritySchemeResponse } from '../../models/v3';

export class IssueSecuritySchemes {
  constructor(private readonly client: Client) { }

  async getIssueSecuritySchemes(parameters?: any, callback?: Callback<SecuritySchemesResponse>): Promise<SecuritySchemesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/issuesecurityschemes',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueSecurityScheme(parameters: {
    id: number;
  }, callback?: Callback<SecuritySchemeResponse>): Promise<SecuritySchemeResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuesecurityschemes/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
