import test from "ava";
import * as sinon from 'sinon';
import { Version2Client } from '../../../src';
import { Projects } from '../../../src/version2';

const client = new Version2Client({ host: '' });
const sendRequestStub = sinon.stub(client, 'sendRequest');

test('getAllProjects should calls without parameters', t => {
  const projects = new Projects(client);

  projects.getAllProjects();

  t.truthy(sendRequestStub.calledOnce);

  const callArgument = sendRequestStub.getCall(0).args[0];

  t.deepEqual(callArgument.params, {});
});
