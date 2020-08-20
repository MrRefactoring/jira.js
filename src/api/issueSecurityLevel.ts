import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { PageBeanIssueSecurityLevelMember, SecurityLevel } from '../schemas';
export class IssueSecurityLevel {
  constructor(private readonly client: Sender) {}

  public async getIssueSecurityLevelMembers(
    params: {
      issueSecuritySchemeId: number;
      startAt?: number;
      maxResults?: number;
      issueSecurityLevelId?: Array<number>;
      expand?: string;
    },
    callback?: Callback<PageBeanIssueSecurityLevelMember>,
  ): Promise<PageBeanIssueSecurityLevelMember> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${params.issueSecuritySchemeId}/members`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        issueSecurityLevelId:
          params.issueSecurityLevelId && params.issueSecurityLevelId.join(','),
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getIssueSecurityLevel(
    params: {
      id: string;
    },
    callback?: Callback<SecurityLevel>,
  ): Promise<SecurityLevel> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/securitylevel/${params.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
