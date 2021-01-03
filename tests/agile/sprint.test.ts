import { Sprint, AgileClient } from '../../src/agile';
import * as sinon from 'sinon';

describe('Agile Sprint', () => {
  const client = new AgileClient({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let sprint = new Sprint(client);

  it('moveIssuesToSprintAndRank should accept next parameters', () => {
    sprint.moveIssuesToSprintAndRank({
      sprintId: 10100,
      issues: ['first_issue', 'second_issue'],
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/agile/1.0/sprint/10100/issue');
    expect(callArgument.data).toEqual({
      issues: ['first_issue', 'second_issue'],
    });
  });
});
