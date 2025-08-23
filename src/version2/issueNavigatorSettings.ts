import type { Client } from '../client';
import type { Request } from '../request';

export class IssueNavigatorSettings {
  constructor(private client: Client) {}
  /**
   * Returns the default issue navigator columns. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueNavigatorDefaultColumns() {
    const request: Request = {
      url: '/rest/api/2/settings/columns',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the default issue navigator columns. *
   *
   * - The `columns` parameter accepts a navigable field value and is expressed as HTML form data. To specify multiple
   *   columns, pass multiple `columns` parameters. For example, in curl:
   * -
   * - `curl -X PUT -d columns=summary -d columns=description
   *   https://your-domain.atlassian.net/rest/api/2/settings/columns`
   * -
   * - If no column details are sent, then all default columns are removed.
   * -
   * - A navigable field is one that can be used as a column on the issue navigator. Find details of navigable issue
   *   columns using [Get fields](#api-rest-api-2-field-get).
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setIssueNavigatorDefaultColumns() {
    const request: Request = {
      url: '/rest/api/2/settings/columns',
      method: 'PUT',
    };

    return this.client.sendRequest(request);
  }
}
