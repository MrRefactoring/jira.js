import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueSecurityLevel {
  constructor(private client: Client) {}

  /**
   * Returns issue security level members.
   *
   * Only issue security level members in context of classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueSecurityLevelMembers<T = Models.PageIssueSecurityLevelMember>(
    parameters: Parameters.GetIssueSecurityLevelMembers | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns issue security level members.
   *
   * Only issue security level members in context of classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueSecurityLevelMembers<T = Models.PageIssueSecurityLevelMember>(
    parameters: Parameters.GetIssueSecurityLevelMembers | string,
    callback?: never,
  ): Promise<T>;
  async getIssueSecurityLevelMembers<T = Models.PageIssueSecurityLevelMember>(
    parameters: Parameters.GetIssueSecurityLevelMembers | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const issueSecuritySchemeId = typeof parameters === 'string' ? parameters : parameters.issueSecuritySchemeId;

    const config: RequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${issueSecuritySchemeId}/members`,
      method: 'GET',
      params: {
        startAt: typeof parameters !== 'string' && parameters.startAt,
        maxResults: typeof parameters !== 'string' && parameters.maxResults,
        issueSecurityLevelId: typeof parameters !== 'string' && parameters.issueSecurityLevelId,
        expand: typeof parameters !== 'string' && parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns details of an issue security level.
   *
   * Use [Get issue security scheme](#api-rest-api-2-issuesecurityschemes-id-get) to obtain the IDs of issue security
   * levels associated with the issue security scheme.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getIssueSecurityLevel<T = Models.SecurityLevel>(
    parameters: Parameters.GetIssueSecurityLevel | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns details of an issue security level.
   *
   * Use [Get issue security scheme](#api-rest-api-2-issuesecurityschemes-id-get) to obtain the IDs of issue security
   * levels associated with the issue security scheme.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getIssueSecurityLevel<T = Models.SecurityLevel>(
    parameters: Parameters.GetIssueSecurityLevel | string,
    callback?: never,
  ): Promise<T>;
  async getIssueSecurityLevel<T = Models.SecurityLevel>(
    parameters: Parameters.GetIssueSecurityLevel | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/securitylevel/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
