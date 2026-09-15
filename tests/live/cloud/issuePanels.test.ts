import { describe, expect, it } from 'vitest';
import { getStrictCloudClient } from '../setup/client';
import { TEST_PROJECT_KEY } from '../setup/fixtures';

describe('Jira Cloud — issuePanels (live, read-only)', () => {
  it('reads the pin status of a panel no app provides without a schema mismatch', async () => {
    const moduleId =
      'ari:cloud:ecosystem::extension/00000000-0000-0000-0000-000000000000/00000000-0000-0000-0000-000000000000/static/jira-js-live';

    const result = await getStrictCloudClient().issuePanels.getBulkPinStatus({
      moduleId,
      projectList: [TEST_PROJECT_KEY],
    });

    expect(result.moduleId).toBe(moduleId);
    expect(result.statuses?.[0]?.projectIdOrKey).toBe(TEST_PROJECT_KEY);
    expect(typeof result.statuses?.[0]?.pinned).toBe('boolean');
  });
});
