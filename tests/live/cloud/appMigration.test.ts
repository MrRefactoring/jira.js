import { beforeAll, describe, expect, it } from 'vitest';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `appMigration` API (`updateEntityPropertiesValue`, `updateIssueFields`).
 *
 * These sit on `/rest/atlassian-connect/1/migration`, addressed with a JWT a Connect app mints while moving customer
 * data from server to cloud. A user token has no claim to that identity at all, so — like the `appProperties` family —
 * the failure is about *who is asking* rather than about permission, and no credential this suite can hold will ever
 * reach them.
 *
 * They are also writes into an app's migrated data, which is reason enough not to succeed at one. So what is worth
 * pinning is the refusal: it has to arrive as a typed error carrying its status, rather than as a bare rejection or as
 * a quietly successful no-op.
 *
 * The body shape these declare is checked where it can be — `tests/unit/nonObjectBodies.test.ts` asserts the property
 * list leaves the client as a top-level array, which a live run that never reaches the endpoint cannot show.
 */
describe('Jira Cloud — app migration (live)', () => {
  let client: CloudClient;

  beforeAll(() => {
    client = getCloudClient();
  });

  it('refuses the property-value update typed, and writes nothing', async () => {
    const error = await client.appMigration
      .updateEntityPropertiesValue({
        'Atlassian-Transfer-Id': 'jira-js-live-test-no-such-transfer',
        entityType: 'IssueProperty',
        body: [{ entityId: 99999999, key: 'jira.js.livetest', value: 'never-written' }],
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });

  it('refuses the issue-field update typed as well, whose body is wrapped rather than bare', async () => {
    const error = await client.appMigration
      .updateIssueFields({
        'Atlassian-Transfer-Id': 'jira-js-live-test-no-such-transfer',
        updateValueList: [{ _type: 'StringIssueField', issueID: 99999999, fieldID: 99999999, string: 'never-written' }],
      })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
