import * as sinon from 'sinon';
import { test } from 'vitest';
import { AgileClient } from '@jirajs';

test('moveIssuesToSprintAndRank should accept follow parameters', async ({ expect }) => {
  const client = new AgileClient({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.sprint.moveIssuesToSprintAndRank({
    sprintId: 10100,
    issues: ['first_issue', 'second_issue'],
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/agile/1.0/sprint/10100/issue');
  expect(callArgument.data).toMatchObject({
    issues: ['first_issue', 'second_issue'],
  });
});
