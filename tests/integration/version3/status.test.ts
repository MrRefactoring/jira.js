import { getVersion3Client } from '@tests/integration/utils';
import { describe, expect, it } from 'vitest';
import type { Page } from '@jirajs/schemas';
import type { JiraStatusSchema } from '@jirajs/version3/models';

describe.sequential('Status', () => {
  let statuses: Page<typeof JiraStatusSchema>;
  const getClient = () => getVersion3Client();

  it.sequential('should search statuses', async () => {
    const client = getClient();

    statuses = await client.status.search();

    expect(statuses).toBeDefined();
    expect(statuses.values.length).toBeGreaterThan(0);
  });

  it.sequential('should search statuses by name', async () => {
    const client = getClient();
    const names = statuses.values.map(s => s.name);

    const statusesByName = await client.status.getStatusesByName({ name: names });

    expect(statusesByName).toBeInstanceOf(Array);

    statusesByName.forEach((status, idx) => {
      expect(status.name).toBe(names[idx]);
    });

    for (const { name } of statuses.values) {
      const [status] = await client.status.getStatusesByName({ name: [name] });

      expect(status).toBeDefined();
      expect(status.name).toBe(name);
    }
  });
});
