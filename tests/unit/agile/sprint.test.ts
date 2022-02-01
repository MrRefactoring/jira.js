import test from "ava";
import * as sinon from 'sinon';
import { AgileClient, Sprint } from '../../../src/agile';

const client = new AgileClient({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
let sprint = new Sprint(client);

test.afterEach(() => {
  sprint = new Sprint(client);
  sendRequestStub.reset();
});

test('moveIssuesToSprintAndRank should accept next parameters', t => {
  sprint.moveIssuesToSprintAndRank({
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
