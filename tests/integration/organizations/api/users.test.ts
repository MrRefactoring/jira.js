import { describe, expect, it } from 'vitest';
import { OrganizationsClient } from '@jirajs/organizations/organizationsClient';
import process from 'node:process';

describe('Users', async () => {
  const client = new OrganizationsClient({
    accessToken: process.env.ORGANIZATION_API_TOKEN!,
  });

  const { data: [{ id }] } = await client.organizations.getOrganizations();

  it.sequential('should return managed accounts in an organization', async () => {
    const accounts = await client.users.getManagedAccounts({ id });

    expect(accounts).toBeDefined();
  });
});
