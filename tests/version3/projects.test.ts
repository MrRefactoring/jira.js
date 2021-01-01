import { Version3Client } from "../../src";
import { Projects } from "../../src/version3";
import * as sinon from "sinon";

describe('Version3 Projects', () => {
  const client = new Version3Client({ host: '' });
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
