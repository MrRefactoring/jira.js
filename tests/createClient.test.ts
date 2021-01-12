import {
  AgileClient, BaseClient,
  ClientType,
  createClient,
  Version2Client,
  Version3Client,
} from '../src';

describe('CreateClient', () => {
  it('should return AgileClient', () => {
    const client = createClient(ClientType.Agile, { host: '' });

    expect(client instanceof AgileClient).toBeTruthy();
  });

  it('should return Version 2', () => {
    const client = createClient(ClientType.Version2, { host: '' });

    expect(client instanceof Version2Client).toBeTruthy();
  });

  it('should return Version 3', () => {
    const client = createClient(ClientType.Version3, { host: '' });

    expect(client instanceof Version3Client).toBeTruthy();
  });

  it('should return BaseClient', () => {
    // @ts-ignore
    const client = createClient('baseClient', { host: '' });

    expect(client instanceof BaseClient).toBeTruthy();
  });
});
