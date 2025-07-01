import type { Client } from '../interfaces';

export class Groups {
  constructor(private readonly client: Client) {}

  async searchGroups() {}

  async getGroups() {}

  async getGroupStats() {}

  async getGroup() {}

  async getGroupRoleAssignments() {}
}
