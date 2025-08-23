import { z } from 'zod';

export const FindUsersAndGroupsParametersSchema = z.object({
  /** The search string. */
  query: z.string(),
  /** The maximum number of items to return in each list. */
  maxResults: z.number().int().optional(),
  /** Whether the user avatar should be returned. If an invalid value is provided, the default value is used. */
  showAvatar: z.boolean().optional(),
  /** The custom field ID of the field this request is for. */
  fieldId: z.string().optional(),
  /**
   * The ID of a project that returned users and groups must have permission to view. To include multiple projects,
   * provide an ampersand-separated list. For example, `projectId=10000&projectId=10001`. This parameter is only used
   * when `fieldId` is present.
   */
  projectId: z.array(z.string()).optional(),
  /**
   * The ID of an issue type that returned users and groups must have permission to view. To include multiple issue
   * types, provide an ampersand-separated list. For example, `issueTypeId=10000&issueTypeId=10001`. Special values,
   * such as `-1` (all standard issue types) and `-2` (all subtask issue types), are supported. This parameter is only
   * used when `fieldId` is present.
   */
  issueTypeId: z.array(z.string()).optional(),
  /** The size of the avatar to return. If an invalid value is provided, the default value is used. */
  avatarSize: z
    .enum([
      'xsmall',
      'xsmall@2x',
      'xsmall@3x',
      'small',
      'small@2x',
      'small@3x',
      'medium',
      'medium@2x',
      'medium@3x',
      'large',
      'large@2x',
      'large@3x',
      'xlarge',
      'xlarge@2x',
      'xlarge@3x',
      'xxlarge',
      'xxlarge@2x',
      'xxlarge@3x',
      'xxxlarge',
      'xxxlarge@2x',
      'xxxlarge@3x',
    ])
    .optional(),
  /** Whether the search for groups should be case insensitive. */
  caseInsensitive: z.boolean().optional(),
  /**
   * Whether Connect app users and groups should be excluded from the search results. If an invalid value is provided,
   * the default value is used.
   */
  excludeConnectAddons: z.boolean().optional(),
});

export type FindUsersAndGroupsParameters = z.infer<typeof FindUsersAndGroupsParametersSchema>;
