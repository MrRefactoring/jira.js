import { z } from 'zod';
import { openEnum } from '#/core';
import { SimpleListWrapperApplicationRoleSchema } from '../models';
import { AvatarUrlsSchema } from '../models';
import { SimpleListWrapperGroupNameSchema } from '../models';

export const AssignIssueSchema = z.object({
  /** The ID or key of the issue to be assigned. */
  issueIdOrKey: z.string(),
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_. Required in requests.
   */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').nullish(),
  /**
   * The user account type. Can take the following values:
   *
   * - `atlassian` regular Atlassian user account
   * - `app` system account used for Connect applications and OAuth to represent external systems
   * - `customer` Jira Service Desk account representing an external service desk
   */
  accountType: openEnum(['atlassian', 'app', 'customer', 'unknown']).optional(),
  /** Whether the user is active. */
  active: z.boolean().optional(),
  /**
   * The app type of the user account when accountType is 'app'. Can take the following values:
   *
   * - `service` Service Account
   * - `agent` Rovo Agent Account
   * - `unknown` Unknown app type
   */
  appType: z.string().optional(),
  /** The application roles the user is assigned to. */
  applicationRoles: SimpleListWrapperApplicationRoleSchema.optional(),
  /** The avatars of the user. */
  avatarUrls: AvatarUrlsSchema.optional(),
  /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
  displayName: z.string().optional(),
  /** The email address of the user. Depending on the user’s privacy setting, this may be returned as null. */
  emailAddress: z.string().nullish(),
  /** Expand options that include additional user details in the response. */
  expand: z.string().optional(),
  /** The groups that the user belongs to. */
  groups: SimpleListWrapperGroupNameSchema.optional(),
  /** Whether the user is a guest. */
  guest: z.boolean().optional(),
  /** The locale of the user. Depending on the user’s privacy setting, this may be returned as null. */
  locale: z.string().nullish(),
  /** The URL of the user. */
  self: z.url().optional(),
  /**
   * The time zone specified in the user's profile. If the user's time zone is not visible to the current user (due to
   * user's profile setting), or if a time zone has not been set, the instance's default time zone will be returned.
   */
  timeZone: z.string().optional(),
});

export type AssignIssue = z.input<typeof AssignIssueSchema>;
