import { z } from 'zod';

export const GetFieldsPaginatedParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /** The type of fields to search. */
  type: z.array(z.enum(['custom', 'system'])).optional(),
  /** The IDs of the custom fields to return or, where `query` is specified, filter. */
  id: z.array(z.string()).optional(),
  /** String used to perform a case-insensitive partial match with field names or descriptions. */
  query: z.string().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by:
   *
   * - `contextsCount` sorts by the number of contexts related to a field
   * - `lastUsed` sorts by the date when the value of the field last changed
   * - `name` sorts by the field name
   * - `screensCount` sorts by the number of screens related to a field
   */
  orderBy: z
    .enum([
      'contextsCount',
      '-contextsCount',
      '+contextsCount',
      'lastUsed',
      '-lastUsed',
      '+lastUsed',
      'name',
      '-name',
      '+name',
      'screensCount',
      '-screensCount',
      '+screensCount',
      'projectsCount',
      '-projectsCount',
      '+projectsCount',
    ])
    .optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expand options include:
   *
   * - `key` returns the key for each field
   * - `stableId` returns the stableId for each field
   * - `lastUsed` returns the date when the value of the field last changed
   * - `screensCount` returns the number of screens related to a field
   * - `contextsCount` returns the number of contexts related to a field
   * - `isLocked` returns information about whether the field is locked
   * - `searcherKey` returns the searcher key for each custom field
   */
  expand: z.string().optional(),
  /**
   * The IDs of the projects to filter the fields by. Fields belonging to project Ids that the user does not have access
   * to will not be returned
   */
  projectIds: z.array(z.number().int()).optional(),
});

export type GetFieldsPaginatedParameters = z.infer<typeof GetFieldsPaginatedParametersSchema>;
