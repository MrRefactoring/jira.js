import type { Client } from '../interfaces';

export class Domains {
  constructor(private readonly client: Client) {}

  /**
   * Returns a list of domains in an organization one page at a time.
   */
  async getDomains() {}

  /**
   * Returns information about a single verified domain by ID.
   */
  async getDomain() {}
}
