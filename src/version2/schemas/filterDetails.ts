import { z } from 'zod';
import { SharePermissionSchema } from './sharePermission';
import { FilterSubscriptionSchema } from './filterSubscription';

/** Details of a filter. */
export const FilterDetailsSchema = z.object({
  /**
   * [Experimental] Approximate last used time. Returns the date and time when the filter was last used. Returns `null`
   * if the filter hasn't been used after tracking was enabled. For performance reasons, timestamps aren't updated in
   * real time and therefore may not be exactly accurate.
   */
  approximateLastUsed: z.string().datetime().optional(),
  /** The description of the filter. */
  description: z.string().optional(),
  /**
   * The groups and projects that can edit the filter. This can be specified when updating a filter, but not when
   * creating a filter.
   */
  editPermissions: z.array(SharePermissionSchema).optional(),
  /** Expand options that include additional filter details in the response. */
  expand: z.string().optional(),
  /** Whether the filter is selected as a favorite by any users, not including the filter owner. */
  favourite: z.boolean().optional(),
  /** The count of how many users have selected this filter as a favorite, including the filter owner. */
  favouritedCount: z.number().int().optional(),
  /** The unique identifier for the filter. */
  id: z.string().optional(),
  /** The JQL query for the filter. For example, _project = SSP AND issuetype = Bug_. */
  jql: z.string().optional(),
  /** The name of the filter. */
  name: z.string(),
  /**
   * The user who owns the filter. Defaults to the creator of the filter, however, Jira administrators can change the
   * owner of a shared filter in the admin settings.
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
  /**
   * The groups and projects that the filter is shared with. This can be specified when updating a filter, but not when
   * creating a filter.
   */
  sharePermissions: z.array(SharePermissionSchema).optional(),
  /** The users that are subscribed to the filter. */
  subscriptions: z.array(FilterSubscriptionSchema).optional(),
  /**
   * A URL to view the filter results in Jira, using the ID of the filter. For example,
   * _https://your-domain.atlassian.net/issues/?filter=10100_.
   */
  viewUrl: z.string().optional(),
});

export type FilterDetails = z.infer<typeof FilterDetailsSchema>;
