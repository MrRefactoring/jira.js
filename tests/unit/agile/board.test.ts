import * as sinon from 'sinon';
import { AgileClient } from '../../../src';
import test from 'ava';

const config = { host: '', newErrorHandling: true };

test('getBoard should accept following parameters', t => {
  const client = new AgileClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.board.getBoard({ boardId: 10100 });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/agile/1.0/board/10100');
});

test('getAllSprints should accept following parameters', t => {
  const client = new AgileClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  client.board.getAllSprints({
    boardId: 10111,
    startAt: 0,
    maxResults: 100,
    state: 'testState',
  });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/agile/1.0/board/10111/sprint');
  t.like(callArgument.params, {
    startAt: 0,
    maxResults: 100,
    state: 'testState',
  });
});
