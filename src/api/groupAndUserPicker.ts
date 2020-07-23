import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class GroupAndUserPicker {
  constructor(private readonly client: Sender) {}

  public async findUsersAndGroups(
    params: {
      query: string;
      maxResults?: number;
      showAvatar?: boolean;
      fieldId?: string;
      projectId?: Array<string>;
      issueTypeId?: Array<string>;
      avatarSize?: string;
      caseInsensitive?: boolean;
      excludeConnectAddons?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/groupuserpicker',
      method: 'GET',
      params: {
        query: params.query,
        maxResults: params.maxResults,
        showAvatar: params.showAvatar,
        fieldId: params.fieldId,
        projectId: params.projectId && params.projectId.join(','),
        issueTypeId: params.issueTypeId && params.issueTypeId.join(','),
        avatarSize: params.avatarSize,
        caseInsensitive: params.caseInsensitive,
        excludeConnectAddons: params.excludeConnectAddons,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
