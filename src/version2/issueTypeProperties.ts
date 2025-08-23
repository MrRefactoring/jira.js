import type { Client } from '../client';
import type { Request } from '../request';
import type { GetIssueTypePropertyKeysParameters } from './parameters/getIssueTypePropertyKeysParameters';
import type { DeleteIssueTypePropertyParameters } from './parameters/deleteIssueTypePropertyParameters';
import type { GetIssueTypePropertyParameters } from './parameters/getIssueTypePropertyParameters';
import type { SetIssueTypePropertyParameters } from './parameters/setIssueTypePropertyParameters';

export class IssueTypeProperties {
  constructor(private client: Client) {}
  /**
   * Returns all the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties)
   * keys of the issue type. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) to get the property keys of any
   *       issue type.
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) to get the property keys of any
   *       issue types associated with the projects the user has permission to browse.
   */
  async getIssueTypePropertyKeys(parameters: GetIssueTypePropertyKeysParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   * *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueTypeProperty(parameters: DeleteIssueTypePropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the key and value of the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   * *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) to get the details of any issue
   *       type.
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) to get the details of any issue
   *       types associated with the projects the user has permission to browse.
   */
  async getIssueTypeProperty(parameters: GetIssueTypePropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates or updates the value of the [issue type
   * property](https://developer.atlassian.com/cloud/jira/platform/storing-data-without-a-database/#a-id-jira-entity-properties-a-jira-entity-properties).
   * Use this resource to store and update data against an issue type. *
   *
   * - The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   *   maximum length is 32768 characters.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setIssueTypeProperty(parameters: SetIssueTypePropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request);
  }
}
