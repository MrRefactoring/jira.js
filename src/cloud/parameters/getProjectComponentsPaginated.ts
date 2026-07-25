import { z } from 'zod';

export const GetProjectComponentsPaginatedSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#ordering) the results by a field:
   *
   * - `description` Sorts by the component description.
   * - `issueCount` Sorts by the count of issues associated with the component.
   * - `lead` Sorts by the user key of the component's project lead.
   * - `name` Sorts by component name.
   */
  orderBy: z
    .enum([
      'description',
      '-description',
      '+description',
      'issueCount',
      '-issueCount',
      '+issueCount',
      'lead',
      '-lead',
      '+lead',
      'name',
      '-name',
      '+name',
    ])
    .optional(),
  /**
   * The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the
   * API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira
   * components. Defaults to `jira`.
   */
  componentSource: z.enum(['jira', 'compass', 'auto']).optional(),
  /**
   * Filter the results using a literal string. Components with a matching `name` or `description` are returned (case
   * insensitive).
   */
  query: z.string().optional(),
});

export type GetProjectComponentsPaginated = z.input<typeof GetProjectComponentsPaginatedSchema>;
