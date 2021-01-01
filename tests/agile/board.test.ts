import { AgileClient, Board } from '../../src/agile';
import * as sinon from "sinon";

describe('Agile Board', () => {
  const client = new AgileClient({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  afterEach(() => {
    sendRequestStub.reset();
  });

  it('getBoard should accept next parameters', () => {
    const board = new Board(client);

    board.getBoard({ boardId: 10100 });

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.url).toBe('/agile/1.0/board/10100');
  });
});
