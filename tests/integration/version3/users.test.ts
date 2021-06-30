import { getVersion3Client } from '../utils';

describe('Users', () => {
  const client = getVersion3Client();

  it('should set default user columns', async () => {
    const response = await client.users.setUserColumns();

    expect(typeof response).toBe('string');
    expect(response.trim()).toBe('');
  });
});
