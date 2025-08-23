import { z } from 'zod';

export const FindComponentsForProjectsParametersSchema = z.object({
  /** The project IDs and/or project keys (case sensitive). */
  projectIdsOrKeys: z.array(z.string()).optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * - `description` Sorts by the component description.
   * - `name` Sorts by component name.
   */
  orderBy: z.enum(['description', '-description', '+description', 'name', '-name', '+name']).optional(),
  /**
   * Filter the results using a literal string. Components with a matching `name` or `description` are returned (case
   * insensitive).
   */
  query: z.string().optional(),
});

export type FindComponentsForProjectsParameters = z.infer<typeof FindComponentsForProjectsParametersSchema>;
