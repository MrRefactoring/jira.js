import { z } from 'zod';
import { apiObject } from '#/core';
import { UserLinkSchema } from './userLink';

export const UserSchema = apiObject({
  _links: UserLinkSchema.optional(),
  /**
   * The accountId of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().optional(),
  /** Indicates if the customer is active (true) or inactive (false) */
  active: z.boolean().optional(),
  /**
   * Customer's name for display in a UI. Depending on the customer’s privacy settings, this may return an alternative
   * value.
   */
  displayName: z.string().optional(),
  /** Customer's email address. Depending on the customer’s privacy settings, this may be returned as null. */
  emailAddress: z.string().optional(),
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key: z.string().optional(),
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name: z.string().optional(),
  /** Customer time zone. Depending on the customer’s privacy settings, this may be returned as null. */
  timeZone: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
