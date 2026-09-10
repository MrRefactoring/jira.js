import { z } from 'zod';

export const GetDirectoriesForOrgSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** Filters the results to only the directories where the specified user is a member. */
  accountId: z.string().optional(),
  /** A list of directory IDs. The requestor must have permissions to administer resources linked to these directories. */
  directoryIds: z.array(z.string()).optional(),
  /** A search term to search the `name` field. */
  searchTerm: z.string().optional(),
  /**
   * Sets the cursor position to retrieve the next set of results. If present, all other parameters are discarded when
   * searching.
   */
  cursor: z.string().optional(),
  /** The desired number of results for the search request. */
  limit: z.number().optional(),
});

export type GetDirectoriesForOrg = z.input<typeof GetDirectoriesForOrgSchema>;
