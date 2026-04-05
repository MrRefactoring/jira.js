import { z } from 'zod';

export const GetTrashedFieldsPaginatedSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().optional(),
  id: z.array(z.string()).optional(),
  /** String used to perform a case-insensitive partial match with field names or descriptions. */
  query: z.string().optional(),
  expand: z
    .enum([
      'name',
      '-name',
      '+name',
      'trashDate',
      '-trashDate',
      '+trashDate',
      'plannedDeletionDate',
      '-plannedDeletionDate',
      '+plannedDeletionDate',
      'projectsCount',
      '-projectsCount',
      '+projectsCount',
    ])
    .optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#ordering) the results by a field:
   *
   * - `name` sorts by the field name
   * - `trashDate` sorts by the date the field was moved to the trash
   * - `plannedDeletionDate` sorts by the planned deletion date
   */
  orderBy: z.string().optional(),
});

export type GetTrashedFieldsPaginated = z.input<typeof GetTrashedFieldsPaginatedSchema>;
