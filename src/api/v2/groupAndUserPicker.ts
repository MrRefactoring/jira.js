import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { FoundUsersAndGroups as FoundUsersAndGroupsResponse } from '../../models/v2';

export class GroupAndUserPicker {
  constructor(private readonly client: Client) { }

  async findUsersAndGroups(parameters: {
    query: string;
    maxResults?: number;
    showAvatar?: boolean;
    fieldId?: string;
    projectId?: string[];
    issueTypeId?: string[];
    avatarSize?: string;
    caseInsensitive?: boolean;
    excludeConnectAddons?: boolean;
  }, callback?: Callback<FoundUsersAndGroupsResponse>): Promise<FoundUsersAndGroupsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/groupuserpicker',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
