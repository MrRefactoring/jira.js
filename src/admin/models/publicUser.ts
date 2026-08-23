import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** The current page of search results */

export const PublicUserSchema = apiObject({
  /** Unique ID of the users account. The format is [a-zA-Z0-9_|-:]{1,128} */
  accountId: z.string().optional(),
  /**
   * The display name of the user. Should be used for contextual rendering of the authorship in content. If the user has
   * restricted visibility of their name, their nickname is displayed as a substitute value
   */
  name: z.string().optional(),
  /** The nickname of the user. Should be used for mentions or other in content references to the user. */
  nickname: z.string().optional(),
  /** The type of account */
  accountType: openEnum(['atlassian', 'customer', 'app']).optional(),
  /** The lifecycle status of the account */
  accountStatus: openEnum(['active', 'partial', 'inactive', 'closed']).optional(),
  /** The email address of the user. The email will be absent for any user with an account_type of `app` */
  email: z.string().optional(),
  /** The email verification status of the user. */
  emailVerified: z.boolean().optional(),
  /** The status of the user in the userbase */
  statusInUserbase: z.boolean().optional(),
});

export type PublicUser = z.infer<typeof PublicUserSchema>;
