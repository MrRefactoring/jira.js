export interface FindUsersAndGroups {
  /** The search string. */
  query: string;
  /** The maximum number of items to return in each list. */
  maxResults?: number;
  /** Whether the user avatar should be returned. If an invalid value is provided, the default value is used. */
  showAvatar?: boolean;
  /** The custom field ID of the field this request is for. */
  fieldId?: string;
  /** The ID of a project that returned users and groups must have permission to view. To include multiple projects, provide an ampersand-separated list. For example, `projectId=10000&projectId=10001`. This parameter is only used when `fieldId` is present. */
  projectId?: string[];
  /** The ID of an issue type that returned users and groups must have permission to view. To include multiple issue types, provide an ampersand-separated list. For example, `issueTypeId=10000&issueTypeId=10001`. Special values, such as `-1` (all standard issue types) and `-2` (all subtask issue types), are supported. This parameter is only used when `fieldId` is present. */
  issueTypeId?: string[];
  /** The size of the avatar to return. If an invalid value is provided, the default value is used. */
  avatarSize?: string;
  /** Whether the search for groups should be case insensitive. */
  caseInsensitive?: boolean;
  /** Whether Connect app users and groups should be excluded from the search results. If an invalid value is provided, the default value is used. */
  excludeConnectAddons?: boolean;
}
