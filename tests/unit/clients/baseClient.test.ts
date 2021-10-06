import * as sinon from 'sinon';
import { BaseClient } from '../../../src';

const XAtlassianToken = 'X-Atlassian-Token';

describe('BaseClient', () => {
  it('should create X-Atlassian-Token: no-check header in requests', () => {
    const client = new BaseClient({
      host: '',
      noCheckAtlassianToken: true,
    });

    // @ts-ignore
    const defaultHeaders = client.instance.defaults.headers || {};

    expect(defaultHeaders[XAtlassianToken]).toBe('no-check');

    const sendRequestStub = sinon.stub(client, 'sendRequest');

    // @ts-ignore
    client.sendRequest({}, undefined); // TODO problem with never type

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.headers?.[XAtlassianToken]).toBeUndefined();
  });

  it('should not create X-Atlassian-Token: no-check header in requests case 1', () => {
    const client = new BaseClient({
      host: '',
      noCheckAtlassianToken: false,
    });

    // @ts-ignore
    const defaultHeaders = client.instance.defaults.headers || {};

    expect(defaultHeaders[XAtlassianToken]).toBeUndefined();

    const sendRequestStub = sinon.stub(client, 'sendRequest');

    // @ts-ignore
    client.sendRequest({}, undefined); // TODO problem with never type

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.headers?.[XAtlassianToken]).toBeUndefined();
  });

  it('should create X-Atlassian-Token: no-check header in requests case 2', () => {
    const client = new BaseClient({
      host: '',
    });

    // @ts-ignore
    const defaultHeaders = client.instance.defaults.headers || {};

    expect(defaultHeaders[XAtlassianToken]).toBeUndefined();

    const sendRequestStub = sinon.stub(client, 'sendRequest');

    // @ts-ignore
    client.sendRequest({}, undefined); // TODO problem with never type

    expect(sendRequestStub.calledOnce).toBeTruthy();

    const callArgument = sendRequestStub.getCall(0).args[0];

    expect(callArgument.headers?.[XAtlassianToken]).toBeUndefined();
  });
});
