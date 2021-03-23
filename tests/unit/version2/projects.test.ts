import * as sinon from 'sinon';
import { Version2Client } from '../../../src';
import { Projects } from '../../../src/version2';

describe('Version2 Projects', () => {
  const client = new Version2Client({ host: '' });
  const sendRequestStub = sinon.stub(client, 'sendRequest');

  afterEach(() => {
    sendRequestStub.reset();
  });

  it('getAllProjects should calls without parameters', () => {
    const projects = new Projects(client);

    projects.getAllProjects();

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.params).toEqual({});
  });
});
