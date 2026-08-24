import { z } from 'zod';
import { openEnum } from '#/core';

export const GetGroupsSchema = z.object({
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
  /**
   * Sets the cursor position to retrieve the next set of results. If present, all other parameters are discarded when
   * searching.
   */
  cursor: z.string().optional(),
  /** The desired number of results for the search request. */
  limit: z.number().optional(),
  /** A list of directory IDs. The requestor must have permissions to administer resources linked to these directories. */
  directoryIds: z.array(z.string()).optional(),
  /** A list of user account IDs. */
  accountIds: z.array(z.string()).optional(),
  /** A list of group IDs. */
  groupIds: z.array(z.string()).optional(),
  /**
   * The list of resource owners to filter the results by. Used to identify resources using their owner to which the
   * user has at least one role assigned to.
   */
  resourceOwners: z.array(z.string()).optional(),
  /**
   * A list of resource IDs. The resource IDs should be specified using the Atlassian Resource Identifier (ARI) format.
   * Example ARI: `ari:cloud:jira-core::site/1`
   */
  resourceIds: z.array(z.string()).optional(),
  /** A search term to search the `name` field. */
  searchTerm: z.string().optional(),
  /** Whether to include counts of different objects associated with the group. */
  counts: z
    .object({
      /** Whether to include the number of resources associated with the group. */
      includeResources: z.boolean().optional(),
      /** Whether to include the number of users associated with the group. */
      includeUsers: z.boolean().optional(),
    })
    .optional(),
  /**
   * The field and direction to sort the results by. Currently, only a single field can be sorted by. If `null`, the
   * default sorting will be used.
   */
  sortBy: z
    .array(
      z.object({
        /** The name of the field to sort the results by. */
        field: openEnum(['name']),
        /** The direction to sort the results by. */
        direction: openEnum(['asc', 'desc']),
      }),
    )
    .optional(),
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
});

export type GetGroups = z.input<typeof GetGroupsSchema>;
