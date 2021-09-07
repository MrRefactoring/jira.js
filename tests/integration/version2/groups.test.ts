import { getVersion2Client } from '../utils';
import { Constants } from '..';

describe('Groups', () => {
  const client = getVersion2Client();

  it('should create a group', async () => {
    const group = await client.groups.createGroup({
      name: Constants.testGroupName,
    });

    expect(group).toBeDefined();
    expect(group.name).toBe(Constants.testGroupName);
  });

  it('should remove a group', async () => {
    const response = await client.groups.removeGroup({
      groupname: Constants.testGroupName,
    });

    expect(typeof response).toBe('string');
    expect(response.trim()).toBe('');
  });
});
