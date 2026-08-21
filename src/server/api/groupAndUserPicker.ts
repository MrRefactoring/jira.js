import { UsersAndGroupsSchema, type UsersAndGroups } from '../models/usersAndGroups';
import type { FindUsersAndGroups } from '../parameters/findUsersAndGroups';
import type { Client, SendRequestOptions } from '#/core';

/** Returns a list of users and groups matching query with highlighting */
export async function findUsersAndGroups(client: Client, parameters?: FindUsersAndGroups): Promise<UsersAndGroups> {
  const config: SendRequestOptions<UsersAndGroups> = {
    url: '/rest/api/2/groupuserpicker',
    method: 'GET',
    searchParams: {
      issueTypeId: parameters?.issueTypeId,
      maxResults: parameters?.maxResults,
      query: parameters?.query,
      showAvatar: parameters?.showAvatar,
      projectId: parameters?.projectId,
      fieldId: parameters?.fieldId,
    },
    schema: UsersAndGroupsSchema,
  };

  return await client.sendRequest(config);
}
