import { z } from 'zod';
import { openEnum } from '#/core';

export const GetDirectoryUsersCountSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /**
   * Unique ID associated with a directory. The `-` character can be used to increase the operation scope to all
   * directories the requestor has permission to manage.
   */
  directoryId: z.string(),
  /** A list of user account IDs. */
  accountIds: z.array(z.string()).optional(),
  /** A list of directory IDs. The requestor must have permissions to administer resources linked to these directories. */
  directoryIds: z.array(z.string()).optional(),
  /**
   * A list of resource IDs. The resource IDs should be specified using the Atlassian Resource Identifier (ARI) format.
   * Example ARI: `ari:cloud:jira-core::site/1`
   */
  resourceIds: z.array(z.string()).optional(),
  /** A list of group IDs. */
  groupIds: z.array(z.string()).optional(),
  /**
   * Whether or not a managed account has two-step verification enabled on their account. If `true`, they have two-step
   * verification enabled. By default, all accounts are returned, regardless of two-step verification status.
   */
  mfaEnabled: z.boolean().optional(),
  /**
   * The claim status for the user account. By default, both `managed` and `unmanaged` accounts are returned.
   *
   * - `managed` - Returns only managed accounts. For more on managed accounts:
   *   https://support.atlassian.com/user-management/docs/what-are-managed-accounts/
   * - `unmanaged` - Returns only unmanaged accounts.
   */
  claimStatus: openEnum(['managed', 'unmanaged']).optional(),
  /**
   * The status for the user account. This status is a composite of `accountStatus` and `membershipStatus`.
   *
   * - `active` - `accountStatus` is `active` and `membershipStatus` is `active`.
   * - `suspended` - `accountStatus` is `active` and `membershipStatus` is `suspended`.
   * - `not_invited` - `accountStatus` is `active` and `membershipStatus` is `no_membership`.
   * - `deactivated` - `accountStatus` is `inactive`.
   * - `for_deletion` - Indicates whether or not a managed account is scheduled for deletion.
   */
  status: z.array(openEnum(['active', 'suspended', 'not_invited', 'deactivated', 'for_deletion'])).optional(),
  /**
   * The lifecycle status of the account.
   *
   * - `active` - The account is active and can be used.
   * - `inactive` - The account is inactive and doesn't have access to any resources.
   * - `closed` - The account is closed and can't be used.
   */
  accountStatus: z.array(openEnum(['active', 'inactive', 'closed'])).optional(),
  /**
   * A list of membership statuses. The membership status is the status of the user account in the organization.
   *
   * - `active` - the account has an active membership for one or more directories within the organization.
   * - `suspended` - the account is suspended in ALL directories within the organization, to which the requestor has
   *   permission to access.
   * - `no_membership` - the account is in NONE of the organization’s directories.
   */
  membershipStatus: z.array(openEnum(['active', 'suspended', 'no_membership'])).optional(),
  /**
   * A list of role IDs. The Atlassian canonical roles are used to determine the permissions of the user against
   * resources within the organization. The allowed roles are:
   *
   * - `atlassian/user` - Can access the product, with no product admin permissions
   * - `atlassian/admin` - Can access the product, with product admin permissions
   * - `atlassian/guest` - Can only access one space you or space admins specify
   * - `atlassian/customer` - (Jira Service Management) Can visit help center, submit help requests, and view articles
   *   (non-billable)
   * - `atlassian/user-access-admin` - No product access. Can administer users and groups for this product in Atlassian
   *   Administration
   * - `atlassian/contributor` - Can access the product to view, comment, and vote only (non-billable)
   * - `atlassian/basic` - Can access basic product features, with no product admin permissions (non-billable)
   * - `atlassian/stakeholder` - Can receive incident updates and has the same product access as Customer. Non-billable
   *   but available only on Premium and Enterprise plans
   * - `atlassian/org-admin` - An organization admin is the highest level of admin and can complete any administrative
   *   task in Atlassian Administration
   * - `atlassian/site-admin` - Site admins can access Atlassian Administration and complete tasks related to the specific
   *   site they are administering.
   * - `atlassian/ai-access` - Can use AI features in AI-enabled apps they have access to.
   */
  roleIds: z
    .array(
      openEnum([
        'atlassian/user',
        'atlassian/admin',
        'atlassian/guest',
        'atlassian/customer',
        'atlassian/user-access-admin',
        'atlassian/contributor',
        'atlassian/basic',
        'atlassian/stakeholder',
        'atlassian/org-admin',
        'atlassian/site-admin',
        'atlassian/ai-access',
      ]),
    )
    .optional(),
  /** A search term to search the `nickname` and `email` fields. */
  searchTerm: z.string().optional(),
  /**
   * The email domain to filter the results. The email domain will be used to search against the account email domain.
   * For example, get all users with the `@atlassian.com` or `@example.com` email domain.
   */
  emailDomains: z.array(z.string()).optional(),
});

export type GetDirectoryUsersCount = z.input<typeof GetDirectoryUsersCountSchema>;
