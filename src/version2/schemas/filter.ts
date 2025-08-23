import { z } from 'zod';
import { SharePermissionSchema } from './sharePermission';

/** Details about a filter. */
export const FilterSchema = z.object({
  /**
   * [Experimental] Approximate last used time. Returns the date and time when the filter was last used. Returns `null`
   * if the filter hasn't been used after tracking was enabled. For performance reasons, timestamps aren't updated in
   * real time and therefore may not be exactly accurate.
   */
  approximateLastUsed: z.string().datetime().optional(),
  /** A description of the filter. */
  description: z.string().optional(),
  /** The groups and projects that can edit the filter. */
  editPermissions: z.array(SharePermissionSchema).optional(),
  /** Whether the filter is selected as a favorite. */
  favourite: z.boolean().optional(),
  /** The count of how many users have selected this filter as a favorite, including the filter owner. */
  favouritedCount: z.number().int().optional(),
  /** The unique identifier for the filter. */
  id: z.string().optional(),
  /** The JQL query for the filter. For example, _project = SSP AND issuetype = Bug_. */
  jql: z.string().optional(),
  /** The name of the filter. Must be unique. */
  name: z.string(),
  /**
   * The user who owns the filter. This is defaulted to the creator of the filter, however Jira administrators can
   * change the owner of a shared filter in the admin settings.
   */
  owner: z.unknown().optional(),
  /**
   * A URL to view the filter results in Jira, using the [Search for issues using
   * JQL](#api-rest-api-2-filter-search-get) operation with the filter's JQL string to return the filter results. For
   * example, _https://your-domain.atlassian.net/rest/api/2/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug_.
   */
  searchUrl: z.string().optional(),
  /** The URL of the filter. */
  self: z.string().optional(),
  /** The groups and projects that the filter is shared with. */
  sharePermissions: z.array(SharePermissionSchema).optional(),
  /**
   * A paginated list of the users that the filter is shared with. This includes users that are members of the groups or
   * can browse the projects that the filter is shared with.
   */
  sharedUsers: z.unknown().optional(),
  /** A paginated list of the users that are subscribed to the filter. */
  subscriptions: z.unknown().optional(),
  /**
   * A URL to view the filter results in Jira, using the ID of the filter. For example,
   * _https://your-domain.atlassian.net/issues/?filter=10100_.
   */
  viewUrl: z.string().optional(),
});

export type Filter = z.infer<typeof FilterSchema>;
