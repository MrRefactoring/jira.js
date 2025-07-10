import type { Client } from '../interfaces';

export class Policies {
  constructor(private readonly client: Client) {}

  async getPolicies() {}

  async createPolicy() {}

  async getPolicy() {}

  async updatePolicy() {}

  async deletePolicy() {}

  async addResourceToPolicy() {}

  async updatePolicyResource() {}

  async deletePolicyResource() {}

  async validatePolicy() {}
}
