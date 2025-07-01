import type { Client } from '../interfaces';
import { type Page, PageSchema, UserSchema } from '../responses';
import type { GetManagedAccountsRequest } from '../requests';

export class Users {
  constructor(private readonly client: Client) {}

  /**
   * Returns a list of managed accounts in an organization.
   */
  async getManagedAccounts({ id, cursor }: GetManagedAccountsRequest): Promise<Page<typeof UserSchema>> {
    return this.client.sendRequest({
      url: `/v1/orgs/${id}/users`,
      method: 'GET',
      query: {
        cursor,
      },
    }, PageSchema(UserSchema));
  }

  /**
   * The API is available for customers using the new user management experience only. [How the new user management experience works](https://community.atlassian.com/t5/Atlassian-Access-articles/User-management-for-cloud-admins-just-got-easier/ba-p/1576592)
   *
   * Returns a list of users within an organization, offering search functionality through multiple parameters for more precise results.
   */
  async searchUsers() {}

  /**
   * @experimental
   * Returns a page of users in an organization that match the supplied parameters.
   */
  async getUsers() {}

  /**
   * @experimental
   * Returns user stats for the organization.
   */
  async getUserStats() {}

  /**
   * @experimental
   * Returns a page of role assignments for a user that match the supplied parameters.
   */
  async getUserRoleAssignments() {}
}
