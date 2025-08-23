import type { Client } from '../client';
import type { Request } from '../request';
import type { GetIssueSecurityLevelMembersParameters } from './parameters/getIssueSecurityLevelMembersParameters';
import type { GetIssueSecurityLevelParameters } from './parameters/getIssueSecurityLevelParameters';

export class IssueSecurityLevel {
  constructor(private client: Client) {}
  /**
   * Returns issue security level members. *
   *
   * - Only issue security level members in context of classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueSecurityLevelMembers(parameters: GetIssueSecurityLevelMembersParameters) {
    const request: Request = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.issueSecuritySchemeId}/members`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        issueSecurityLevelId: parameters.issueSecurityLevelId,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns details of an issue security level. *
   *
   * - Use [Get issue security scheme](#api-rest-api-2-issuesecurityschemes-id-get) to obtain the IDs of issue security
   *   levels associated with the issue security scheme.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getIssueSecurityLevel(parameters: GetIssueSecurityLevelParameters) {
    const request: Request = {
      url: `/rest/api/2/securitylevel/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
