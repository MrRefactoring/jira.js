import { z } from 'zod';
import { IssueBeanSchema } from './issueBean';

/** The result of a JQL search with issues reconsilation. */
export const SearchAndReconcileResultsSchema = z.object({
  /** Indicates whether this is the last page of the paginated response. */
  isLast: z.boolean().optional(),
  /** The list of issues found by the search or reconsiliation. */
  issues: z.array(IssueBeanSchema).optional(),
  /** The ID and name of each field in the search results. */
  names: z.object({}).optional(),
  /**
   * Continuation token to fetch the next page. If this result represents the last or the only page this token will be
   * null. This token will expire in 7 days.
   */
  nextPageToken: z.string().optional(),
  /** The schema describing the field types in the search results. */
  schema: z.object({}).optional(),
});

export type SearchAndReconcileResults = z.infer<typeof SearchAndReconcileResultsSchema>;
