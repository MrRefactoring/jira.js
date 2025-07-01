import {
  type Page,
  type Organization,
  OrganizationSchema,
  PageSchema,
  DataSchema,
} from '../responses';
import type { Client } from '../interfaces';

export class Organizations {
  constructor(private readonly client: Client) {}

  /**
   * Returns a list of your organizations (based on your API key).
   * @param cursor Sets the starting point for the page of results to return.
   */
  async getOrganizations(cursor?: string): Promise<Page<typeof OrganizationSchema>> {
    return this.client.sendRequest({
      url: '/v1/orgs',
      method: 'GET',
      query: {
        cursor,
      },
    }, PageSchema(OrganizationSchema));
  }

  /**
   * Returns information about a single organization by ID
   * @param id Your organization is identified by a Unique ID. You get your organization ID and Organization API key simultaneously.
   */
  async getOrganization(id: string): Promise<Organization> {
    const { data } = await this.client.sendRequest({
      url: `/v1/orgs/${id}`,
      method: 'GET',
    }, DataSchema(OrganizationSchema));

    return data;
  }
}
