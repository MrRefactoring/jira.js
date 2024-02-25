import * as sinon from 'sinon';
import test from 'ava';
import { AgileClient } from '../../../src';

test('moveIssuesToSprintAndRank should accept follow parameters', t => {
  const client = new AgileClient({ host: 'http://localhost' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.sprint.moveIssuesToSprintAndRank({
    sprintId: 10100,
    issues: ['first_issue', 'second_issue'],
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/agile/1.0/sprint/10100/issue');
  t.like(callArgument.data, {
    issues: ['first_issue', 'second_issue'],
  });
});
