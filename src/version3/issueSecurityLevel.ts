import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueSecurityLevel {
  constructor(private client: Client) { }
  async getIssueSecurityLevelMembers<T = Models.PageBeanIssueSecurityLevelMember>(parameters: Parameters.GetIssueSecurityLevelMembers, callback: Callback<T>): Promise<void>;
  async getIssueSecurityLevelMembers<T = Models.PageBeanIssueSecurityLevelMember>(parameters: Parameters.GetIssueSecurityLevelMembers, callback?: undefined): Promise<T>;
  async getIssueSecurityLevelMembers<T = Models.PageBeanIssueSecurityLevelMember>(parameters: Parameters.GetIssueSecurityLevelMembers, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issuesecurityschemes/${parameters.issueSecuritySchemeId}/members`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        issueSecurityLevelId: parameters.issueSecurityLevelId,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueSecurityLevel<T = Models.SecurityLevel>(parameters: Parameters.GetIssueSecurityLevel, callback: Callback<T>): Promise<void>;
  async getIssueSecurityLevel<T = Models.SecurityLevel>(parameters: Parameters.GetIssueSecurityLevel, callback?: undefined): Promise<T>;
  async getIssueSecurityLevel<T = Models.SecurityLevel>(parameters: Parameters.GetIssueSecurityLevel, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/securitylevel/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
