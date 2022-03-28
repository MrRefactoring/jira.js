import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueSecuritySchemes {
  constructor(private client: Client) {}

  /**
   * Returns all [issue security schemes](https://confluence.atlassian.com/x/J4lKLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueSecuritySchemes<T = Models.SecuritySchemes>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all [issue security schemes](https://confluence.atlassian.com/x/J4lKLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueSecuritySchemes<T = Models.SecuritySchemes>(callback?: never): Promise<T>;
  async getIssueSecuritySchemes<T = Models.SecuritySchemes>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuesecurityschemes',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns an issue security scheme along with its security levels.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project that uses the
   *   requested issue security scheme.
   */
  async getIssueSecurityScheme<T = Models.SecurityScheme>(
    parameters: Parameters.GetIssueSecurityScheme,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns an issue security scheme along with its security levels.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project that uses the
   *   requested issue security scheme.
   */
  async getIssueSecurityScheme<T = Models.SecurityScheme>(
    parameters: Parameters.GetIssueSecurityScheme,
    callback?: never
  ): Promise<T>;
  async getIssueSecurityScheme<T = Models.SecurityScheme>(
    parameters: Parameters.GetIssueSecurityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuesecurityschemes/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
