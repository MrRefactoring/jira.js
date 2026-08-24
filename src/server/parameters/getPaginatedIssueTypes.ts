import { z } from 'zod';

export const GetPaginatedIssueTypesSchema = z.object({
  'X-Requested-With': z.string().optional(),
  /** The maximum number of issue types to return. */
  maxResults: z.number().optional(),
  /** The string that issue type names will be matched with. */
  query: z.string().optional(),
  /** The set of project ids to filter issue types. */
  projectIds: z.array(z.number()).optional(),
  /** The index of the first issue type to return. */
  startAt: z.number().optional(),
});

export type GetPaginatedIssueTypes = z.input<typeof GetPaginatedIssueTypesSchema>;
