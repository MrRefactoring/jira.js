import * as sinon from 'sinon';
import { Projects } from '../../../src/version2';
import test from 'ava';
import { Version2Client } from '../../../src';

const client = new Version2Client({ host: 'http://localhost', newErrorHandling: true });
const sendRequestStub = sinon.stub(client, 'sendRequest');

test('getAllProjects should calls without parameters', t => {
  const projects = new Projects(client);

  projects.getAllProjects();

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.params, {
    expand: undefined,
    properties: undefined,
    recent: undefined,
  });
});
