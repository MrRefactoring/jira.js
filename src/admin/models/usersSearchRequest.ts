import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { NamesOrNicknamesSchema } from './namesOrNicknames';
import { EmailUsernamesSchema } from './emailUsernames';
import { EmailDomainsSchema } from './emailDomains';

export const UsersSearchRequestSchema = apiObject({
  /** Unique ID of the users account. The format is [a-zA-Z0-9_|-:]{1,128} */
  accountIds: z.array(z.string().max(100, 'accountIds must be at most 100 characters')).optional(),
  /** The type of account */
  accountTypes: z.array(openEnum(['atlassian', 'customer', 'app'])).optional(),
  /** The lifecycle status of the account */
  accountStatuses: z.array(openEnum(['ACTIVE', 'INACTIVE'])).optional(),
  namesOrNicknames: NamesOrNicknamesSchema.optional(),
  emailUsernames: EmailUsernamesSchema.optional(),
  emailDomains: EmailDomainsSchema.optional(),
  /** Suspended users with no access. This is independent of the user account status */
  isSuspended: z.boolean().optional(),
  /** Starting point marker for page result retrieval */
  cursor: z.string().optional(),
  /** The number of items to return. Default = max = 10000 */
  limit: z.number().optional(),
  /**
   * Indicates the user information fields to include in the response. If unspecified, the response defaults to
   * including only the accountId, accountType, and accountStatus fields. The data for the product last access may be
   * delayed by up to 24 hours.
   */
  expand: z.array(openEnum(['NAME', 'EMAIL', 'EMAIL_VERIFIED', 'PRODUCT_LAST_ACCESS', 'GROUPS'])).optional(),
});

export type UsersSearchRequest = z.infer<typeof UsersSearchRequestSchema>;
