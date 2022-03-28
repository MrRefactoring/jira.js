import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueSecurityLevel {
  constructor(private client: Client) {}

  /**
   * Returns issue security level members.
   *
   * Only issue security level members in context of classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueSecurityLevelMembers<T = Models.PageIssueSecurityLevelMember>(
    parameters: Parameters.GetIssueSecurityLevelMembers,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns issue security level members.
   *
   * Only issue security level members in context of classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueSecurityLevelMembers<T = Models.PageIssueSecurityLevelMember>(
    parameters: Parameters.GetIssueSecurityLevelMembers,
    callback?: never
  ): Promise<T>;
  async getIssueSecurityLevelMembers<T = Models.PageIssueSecurityLevelMember>(
    parameters: Parameters.GetIssueSecurityLevelMembers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuesecurityschemes/${parameters.issueSecuritySchemeId}/members`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        issueSecurityLevelId: parameters.issueSecurityLevelId,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns details of an issue security level.
   *
   * Use [Get issue security scheme](#api-rest-api-3-issuesecurityschemes-id-get) to obtain the IDs of issue security
   * levels associated with the issue security scheme.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getIssueSecurityLevel<T = Models.SecurityLevel>(
    parameters: Parameters.GetIssueSecurityLevel,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns details of an issue security level.
   *
   * Use [Get issue security scheme](#api-rest-api-3-issuesecurityschemes-id-get) to obtain the IDs of issue security
   * levels associated with the issue security scheme.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getIssueSecurityLevel<T = Models.SecurityLevel>(
    parameters: Parameters.GetIssueSecurityLevel,
    callback?: never
  ): Promise<T>;
  async getIssueSecurityLevel<T = Models.SecurityLevel>(
    parameters: Parameters.GetIssueSecurityLevel,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/securitylevel/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
