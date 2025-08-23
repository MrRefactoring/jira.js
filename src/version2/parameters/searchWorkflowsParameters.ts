import { z } from 'zod';

export const SearchWorkflowsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `values.transitions` Returns the transitions that each workflow is associated with.
   */
  expand: z.string().optional(),
  /** String used to perform a case-insensitive partial match with workflow name. */
  queryString: z.string().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field:
   *
   * - `name` Sorts by workflow name.
   * - `created` Sorts by create time.
   * - `updated` Sorts by update time.
   */
  orderBy: z.string().optional(),
  /** The scope of the workflow. Global for company-managed projects and Project for team-managed projects. */
  scope: z.string().optional(),
  /** Filters active and inactive workflows. */
  isActive: z.boolean().optional(),
});

export type SearchWorkflowsParameters = z.infer<typeof SearchWorkflowsParametersSchema>;
