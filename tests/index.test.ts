import { Client } from '../src';

describe('Client tests', () => {
  it('should create client', () => {
    const client = new Client({
      host: 'https://xxx.jira.com',
    });

    expect(client).toBeDefined();
  });

  describe('GDPR flag', () => {
    it('should return true', () => {
      const client = new Client({
        host: '',
        strictGDPR: true,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const { requestInstance } = client;

      expect(requestInstance.defaults.headers['x-atlassian-force-account-id']).toBeTruthy();
    });

    it('should return false', () => {
      const client = new Client({
        host: '',
        strictGDPR: false,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const { requestInstance } = client;

      expect(requestInstance.defaults.headers['x-atlassian-force-account-id']).toBeFalsy();
    });

    it('should not be defined', () => {
      const client = new Client({
        host: '',
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const { requestInstance } = client;

      expect(requestInstance.defaults.headers.hasOwnProperty('x-atlassian-force-account-id')).toBeFalsy();
    });
  });
});
