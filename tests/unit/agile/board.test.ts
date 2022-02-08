import * as sinon from 'sinon';
import test from 'ava';
import { AgileClient, Board } from '../../../src/agile';


const client = new AgileClient({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');
let board = new Board(client);

test.afterEach(() => {
  sendRequestStub.reset();
});

test.serial('getBoard should accept following parameters', t => {
  board.getBoard({ boardId: 10100 });

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.is(callArgument.url, '/rest/agile/1.0/board/10100');
});

test.serial('getAllSprints should accept following parameters', t => {
  board.getAllSprints({
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
