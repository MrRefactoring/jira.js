import * as sinon from 'sinon';
import { AgileClient, Board } from '../../src/agile';

describe('Agile Board', () => {
  const client = new AgileClient({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');
  let board = new Board(client);

  afterEach(() => {
    sendRequestStub.reset();
    board = new Board(client);
  });

  it('getBoard should accept next parameters', () => {
    board.getBoard({ boardId: 10100 });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/agile/1.0/board/10100');
  });

  it('', () => {
    board.getAllSprints({
      boardId: 10111,
      startAt: 0,
      maxResults: 100,
      state: 'testState',
    });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/agile/1.0/board/10111/sprint');
    expect(callArgument.params).toEqual({
      startAt: 0,
      maxResults: 100,
      state: 'testState',
    });
  });
});
