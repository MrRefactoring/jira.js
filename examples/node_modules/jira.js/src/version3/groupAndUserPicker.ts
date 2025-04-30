import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class GroupAndUserPicker {
  constructor(private client: Client) {}

  /**
   * Returns a list of users and groups matching a string. The string is used:
   *
   * - For users, to find a case-insensitive match with display name and e-mail address. Note that if a user has hidden
   *   their email address in their user profile, partial matches of the email address will not find the user. An exact
   *   match is required.
   * - For groups, to find a case-sensitive match with group name.
   *
   * For example, if the string _tin_ is used, records with the display name _Tina_, email address
   * _sarah@tinplatetraining.com_, and the group _accounting_ would be returned.
   *
   * Optionally, the search can be refined to:
   *
   * - The projects and issue types associated with a custom field, such as a user picker. The search can then be further
   *   refined to return only users and groups that have permission to view specific:
   *
   *   - Projects.
   *   - Issue types.
   *
   *   If multiple projects or issue types are specified, they must be a subset of those enabled for the custom field or
   *   no results are returned. For example, if a field is enabled for projects A, B, and C then the search could be
   *   limited to projects B and C. However, if the search is limited to projects B and D, nothing is returned.
   * - Not return Connect app users and groups.
   * - Return groups that have a case-insensitive match with the query.
   *
   * The primary use case for this resource is to populate a picker field suggestion list with users or groups. To this
   * end, the returned object includes an `html` field for each list. This field highlights the matched query term in
   * the item name with the HTML strong tag. Also, each list is wrapped in a response object that contains a header for
   * use in a picker, specifically _Showing X of Y matching groups_.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async findUsersAndGroups<T = Models.FoundUsersAndGroups>(
    parameters: Parameters.FindUsersAndGroups,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of users and groups matching a string. The string is used:
   *
   * - For users, to find a case-insensitive match with display name and e-mail address. Note that if a user has hidden
   *   their email address in their user profile, partial matches of the email address will not find the user. An exact
   *   match is required.
   * - For groups, to find a case-sensitive match with group name.
   *
   * For example, if the string _tin_ is used, records with the display name _Tina_, email address
   * _sarah@tinplatetraining.com_, and the group _accounting_ would be returned.
   *
   * Optionally, the search can be refined to:
   *
   * - The projects and issue types associated with a custom field, such as a user picker. The search can then be further
   *   refined to return only users and groups that have permission to view specific:
   *
   *   - Projects.
   *   - Issue types.
   *
   *   If multiple projects or issue types are specified, they must be a subset of those enabled for the custom field or
   *   no results are returned. For example, if a field is enabled for projects A, B, and C then the search could be
   *   limited to projects B and C. However, if the search is limited to projects B and D, nothing is returned.
   * - Not return Connect app users and groups.
   * - Return groups that have a case-insensitive match with the query.
   *
   * The primary use case for this resource is to populate a picker field suggestion list with users or groups. To this
   * end, the returned object includes an `html` field for each list. This field highlights the matched query term in
   * the item name with the HTML strong tag. Also, each list is wrapped in a response object that contains a header for
   * use in a picker, specifically _Showing X of Y matching groups_.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * users and groups_ [global permission](https://confluence.atlassian.com/x/yodKLg).
   */
  async findUsersAndGroups<T = Models.FoundUsersAndGroups>(
    parameters: Parameters.FindUsersAndGroups,
    callback?: never,
  ): Promise<T>;
  async findUsersAndGroups<T = Models.FoundUsersAndGroups>(
    parameters: Parameters.FindUsersAndGroups,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/groupuserpicker',
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
    };

    return this.client.sendRequest(config, callback);
  }
}
