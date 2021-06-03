import * as Models from './models';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueNavigatorSettings {
  constructor(private client: Client) {}

  /**
   * Returns the default issue navigator columns.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueNavigatorDefaultColumns<T = Models.ColumnItem[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the default issue navigator columns.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueNavigatorDefaultColumns<T = Models.ColumnItem[]>(callback?: never): Promise<T>;
  async getIssueNavigatorDefaultColumns<T = Models.ColumnItem[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/settings/columns',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueNavigatorSettings.getIssueNavigatorDefaultColumns',
    });
  }

  /**
   * Sets the default issue navigator columns.
   *
   * The `columns` parameter accepts a navigable field value and is expressed as HTML form data. To specify multiple
   * columns, pass multiple `columns` parameters. For example, in curl:
   *
   * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/2/settings/columns`
   *
   * If no column details are sent, then all default columns are removed.
   *
   * A navigable field is one that can be used as a column on the issue navigator. Find details of navigable issue
   * columns using [Get fields](#api-rest-api-2-field-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setIssueNavigatorDefaultColumns<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Sets the default issue navigator columns.
   *
   * The `columns` parameter accepts a navigable field value and is expressed as HTML form data. To specify multiple
   * columns, pass multiple `columns` parameters. For example, in curl:
   *
   * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/2/settings/columns`
   *
   * If no column details are sent, then all default columns are removed.
   *
   * A navigable field is one that can be used as a column on the issue navigator. Find details of navigable issue
   * columns using [Get fields](#api-rest-api-2-field-get).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setIssueNavigatorDefaultColumns<T = unknown>(callback?: never): Promise<T>;
  async setIssueNavigatorDefaultColumns<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/settings/columns',
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'version2.issueNavigatorSettings.setIssueNavigatorDefaultColumns',
    });
  }
}
