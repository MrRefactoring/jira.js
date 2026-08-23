import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { AccountTypeSchema } from './accountType';
import { StatusSchema } from './status';
import { AccountStatusSchema } from './accountStatus';
import { MembershipStatusSchema } from './membershipStatus';
import { ClaimStatusSchema } from './claimStatus';
import { PlatformRoleSchema } from './platformRole';
import { UserCountsSchema } from './userCounts';
import { MultiDirectoryProductAccessSchema } from './multiDirectoryProductAccess';
import { MultiDirectoryUserGroupSchema } from './multiDirectoryUserGroup';
import { LinkSelfCursorSchema } from './linkSelfCursor';

export const MultiDirectoryUserSchema = apiObject({
  /** Unique ID of the user's account. */
  accountId: z.string().optional(),
  accountType: AccountTypeSchema.optional(),
  status: StatusSchema.optional(),
  accountStatus: AccountStatusSchema.optional(),
  membershipStatus: MembershipStatusSchema.optional(),
  /**
   * The ISO-8601 date and time the user was first added to any directory the admin is permitted to view in the
   * organization
   */
  addedToOrg: z.string().optional(),
  /** The full name of the user. */
  name: z.string().optional(),
  /** The nickname of the user. */
  nickname: z.string().optional(),
  /** The email address of the user. */
  email: z.string().optional(),
  /** The email verification status of the user. If true, the user verified their email after creating their account. */
  emailVerified: z.boolean().optional(),
  claimStatus: ClaimStatusSchema.optional(),
  /** The admin role IDs of the user. The role IDs are used to determine the permissions of the user. */
  platformRoles: z.array(PlatformRoleSchema).optional(),
  /** The URL of the user's profile picture. */
  picture: z.string().optional(),
  /** The URL of the user's public avatar. */
  avatar: z.string().optional(),
  /**
   * How a managed account was added to a directory.
   *
   * - **invited** – invited by an admin
   * - **synced** – provisioned from an identity provider
   *
   * If `null`, then the management source couldn’t be determined.
   */
  managementSource: openEnum(['invited', 'synced']).nullish(),
  /**
   * Whether or not a managed account has two-step verification enabled on their account. If true, they have two-step
   * verification enabled.
   *
   * By default, all accounts are returned, regardless of two-step verification status.
   */
  mfaEnabled: z.boolean().optional(),
  /** Job title of the user. */
  jobTitle: z.string().optional(),
  /** Department the user belongs to. */
  department: z.string().nullish(),
  /** Organization the user belongs to. */
  organization: z.string().nullish(),
  /** Location of the user. */
  location: z.string().nullish(),
  /** Time zone the user is in. */
  timeZone: z.string().nullish(),
  counts: UserCountsSchema.optional(),
  /**
   * The user's last active timestamp for each product in the given directory. Returned only when the `productAccess`
   * expand option is requested.
   */
  productAccess: z.array(MultiDirectoryProductAccessSchema).optional(),
  /**
   * The user's group memberships within the requested directory. Returned only when the `groups` expand option is
   * requested.
   */
  groups: z.array(MultiDirectoryUserGroupSchema).optional(),
  links: LinkSelfCursorSchema.optional(),
});

export type MultiDirectoryUser = z.infer<typeof MultiDirectoryUserSchema>;
