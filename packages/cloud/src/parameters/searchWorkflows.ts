import { z } from 'zod';

export const SearchWorkflowsSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `values.transitions` Returns the transitions that each workflow is associated with.
   */
  expand: z
    .union([z.string(), z.array(z.string()), z.enum(['values.transitions']), z.array(z.enum(['values.transitions']))])
    .optional(),
  /** String used to perform a case-insensitive partial match with workflow name. */
  queryString: z.string().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#ordering) the results by a field:
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

export type SearchWorkflows = z.input<typeof SearchWorkflowsSchema>;
