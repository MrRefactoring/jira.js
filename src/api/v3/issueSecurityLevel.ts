import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { PageBeanIssueSecurityLevelMember as PageBeanIssueSecurityLevelMemberResponse, SecurityLevel as SecurityLevelResponse } from '../../models/v3';

export class IssueSecurityLevel {
  constructor(private readonly client: Client) { }

  async getIssueSecurityLevelMembers(parameters: {
    issueSecuritySchemeId: number;
    startAt?: number;
    maxResults?: number;
    issueSecurityLevelId?: number[];
    expand?: string;
  }, callback?: Callback<PageBeanIssueSecurityLevelMemberResponse>): Promise<PageBeanIssueSecurityLevelMemberResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issuesecurityschemes/${parameters.issueSecuritySchemeId}/members`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueSecurityLevel(parameters: {
    id: string;
  }, callback?: Callback<SecurityLevelResponse>): Promise<SecurityLevelResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/securitylevel/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
