import type { Client } from '../client';
import type { Request } from '../request';

export class ServerInfo {
  constructor(private client: Client) {}
  /**
   * Returns information about the Jira instance. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getServerInfo() {
    const request: Request = {
      url: '/rest/api/2/serverInfo',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
