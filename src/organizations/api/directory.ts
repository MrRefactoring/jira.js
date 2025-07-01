import type { Client } from '../interfaces';

export class Directory {
  constructor(private readonly client: Client) {}

  /**
   * @experimental
   * Returns a page of directories in an organization that match the supplied parameters.
   */
  async getDirectories() {}

  /**
   * TODO
   */
  async getUsersLastActiveDates() {}

  /**
   * TODO
   */
  async removeUserAccess() {}

  /**
   * TODO
   */
  async suspendUserAccess() {}

  /**
   * TODO
   */
  async restoreUserAccess() {}

  /**
   * TODO
   */
  async createGroup() {}

  /**
   * TODO
   */
  async deleteGroup() {}

  /**
   * TODO
   */
  async addUserToGroup() {}

  /**
   * TODO
   */
  async removeUserFromGroup() {}

  /**
   * @experimental
   */
  async inviteUserToOrganization() {}

  /**
   * @experimental
   */
  async assignRolesToGroup() {}

  /**
   * @experimental
   */
  async revokeRolesFromGroup() {}

  /**
   * @experimental
   */
  async grantUserAccess() {}

  /**
   * @experimental
   */
  async revokeUserAccess() {}
}
