import { describe, expect, it } from 'vitest';
import { OrganizationsClient } from '@jirajs/organizations/organizationsClient';
import * as process from 'node:process';

describe('Organization', () => {
  const client = new OrganizationsClient({
    accessToken: process.env.ORGANIZATION_API_TOKEN!,
  });

  it.sequential('should return list of organizations', async () => {
    const organizations = await client.organizations.getOrganizations();

    expect(organizations).toBeDefined();
    expect(organizations.data.length).toBeGreaterThanOrEqual(1);
    expect(organizations.data[0].id).toBeTypeOf('string');
  });

  it.sequential('should return organization', async () => {
    const { data: [{ id }] } = await client.organizations.getOrganizations();

    const organization = await client.organizations.getOrganization(id);

    expect(organization).toBeDefined();
    expect(organization.id).toBe(id);
  });
});
