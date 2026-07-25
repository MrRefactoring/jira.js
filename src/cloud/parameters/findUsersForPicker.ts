import { z } from 'zod';

export const FindUsersForPickerSchema = z.object({
  /**
   * A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant
   * users. The string can match the prefix of the attribute's value. For example, _query=john_ matches a user with a
   * `displayName` of _John Smith_ and a user with an `emailAddress` of _johnson@example.com_.
   */
  query: z.string(),
  /** The maximum number of items to return. The total number of matched users is returned in `total`. */
  maxResults: z.number().optional(),
  /** Include the URI to the user's avatar. */
  showAvatar: z.boolean().optional(),
  /**
   * A list of account IDs to exclude from the search results. This parameter accepts a comma-separated list. Multiple
   * account IDs can also be provided using an ampersand-separated list. For example,
   * `excludeAccountIds=5b10a2844c20165700ede21g,5b10a0effa615349cb016cd8&excludeAccountIds=5b10ac8d82e05b22cc7d4ef5`.
   * Cannot be provided with `exclude`.
   */
  excludeAccountIds: z.array(z.string()).optional(),
  avatarSize: z.string().optional(),
  excludeConnectUsers: z.boolean().optional(),
});

export type FindUsersForPicker = z.input<typeof FindUsersForPickerSchema>;
