import * as sinon from 'sinon';
import { test } from 'vitest';
import { AgileClient } from '@jirajs';

const config = { host: 'http://localhost' };

test('getBoard should accept following parameters', async ({ expect }) => {
  const client = new AgileClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.board.getBoard({ boardId: 10100 });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/agile/1.0/board/10100');
});

test('getAllSprints should accept following parameters', async ({ expect }) => {
  const client = new AgileClient(config);
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  await client.board.getAllSprints({
    boardId: 10111,
    startAt: 0,
    maxResults: 100,
    state: 'testState',
  });

  expect(sendRequestStub.calledOnce).toBeTruthy();

  const callArgument = sendRequestStub.getCall(0).args[0];

  expect(callArgument.url).toBe('/rest/agile/1.0/board/10111/sprint');
  expect(callArgument.params).toMatchObject({
    startAt: 0,
    maxResults: 100,
    state: 'testState',
  });
});
