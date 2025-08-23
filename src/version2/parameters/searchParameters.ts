import { z } from 'zod';

export const SearchParametersSchema = z.object({
  /** The project the status is part of or null for global statuses. */
  projectId: z.string().optional(),
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.number().int().optional(),
  /** Term to match status names against or null to search for all statuses in the search scope. */
  searchString: z.string().optional(),
  /** Category of the status to filter by. The supported values are: `TODO`, `IN_PROGRESS`, and `DONE`. */
  statusCategory: z.string().optional(),
});

export type SearchParameters = z.infer<typeof SearchParametersSchema>;
