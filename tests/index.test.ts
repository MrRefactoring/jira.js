import { Client } from '../src';

describe('Client tests', () => {
  it('should create client', () => {
    const client = new Client({
      host: 'https://xxx.jira.com',
    });

    expect(client).toBeDefined();
  });
});
