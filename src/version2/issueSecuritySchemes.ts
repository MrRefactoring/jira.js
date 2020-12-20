import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueSecuritySchemes {
  constructor(private client: Client) { }
  async getIssueSecuritySchemes<T = Models.SecuritySchemes>(callback?: Callback<T>): Promise<void>;
  async getIssueSecuritySchemes<T = Models.SecuritySchemes>(callback?: undefined): Promise<T>;
  async getIssueSecuritySchemes<T = Models.SecuritySchemes>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issuesecurityschemes',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueSecurityScheme<T = Models.SecurityScheme>(parameters: Parameters.GetIssueSecurityScheme, callback: Callback<T>): Promise<void>;
  async getIssueSecurityScheme<T = Models.SecurityScheme>(parameters: Parameters.GetIssueSecurityScheme, callback?: undefined): Promise<T>;
  async getIssueSecurityScheme<T = Models.SecurityScheme>(parameters: Parameters.GetIssueSecurityScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issuesecurityschemes/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
