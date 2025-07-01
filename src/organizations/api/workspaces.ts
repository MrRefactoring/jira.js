import type { Client } from '../interfaces';

export class Workspaces {
  constructor(private readonly client: Client) {}

  /**
   * A workspace refers to a specific instance of an Atlassian product that is accessed through a unique URL. Whenever a user initiates or adds a new product instance, it results in the creation of a distinct workspace.
   *
   * This API will:
   *
   * - Return a paginated list of workspaces in a given org
   * - Return more details about an organization's products (including product URL).
   */
  async getWorkspaces() {
    return this.client.sendRequest({
      url: '/v2/orgs/{orgId}/workspaces',
      method: 'POST',
    });
  }
}
