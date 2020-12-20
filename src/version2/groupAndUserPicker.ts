import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class GroupAndUserPicker {
  constructor(private client: Client) { }
  async findUsersAndGroups<T = Models.FoundUsersAndGroups>(parameters: Parameters.FindUsersAndGroups, callback: Callback<T>): Promise<void>;
  async findUsersAndGroups<T = Models.FoundUsersAndGroups>(parameters: Parameters.FindUsersAndGroups, callback?: undefined): Promise<T>;
  async findUsersAndGroups<T = Models.FoundUsersAndGroups>(parameters: Parameters.FindUsersAndGroups, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/groupuserpicker',
      method: 'GET',
      params: {
        query: parameters.query,
        maxResults: parameters.maxResults,
        showAvatar: parameters.showAvatar,
        fieldId: parameters.fieldId,
        projectId: parameters.projectId,
        issueTypeId: parameters.issueTypeId,
        avatarSize: parameters.avatarSize,
        caseInsensitive: parameters.caseInsensitive,
        excludeConnectAddons: parameters.excludeConnectAddons,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
