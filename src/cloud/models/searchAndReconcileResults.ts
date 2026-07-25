import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueSchema } from './issue';
import { SearchWarningSchema } from './searchWarning';
/** The result of a JQL search with issues reconsilation. */

export const SearchAndReconcileResultsSchema = apiObject({
  /** Indicates whether this is the last page of the paginated response. */
  isLast: z.boolean().optional(),
  /** The list of issues found by the search or reconsiliation. */
  issues: z.array(IssueSchema).optional(),
  /** The ID and name of each field in the search results. */
  names: z.record(z.string(), z.any()).optional(),
  /**
   * Continuation token to fetch the next page. If this result represents the last or the only page this token will be
   * null. This token will expire in 7 days.
   */
  nextPageToken: z.string().optional(),
  /** The schema describing the field types in the search results. */
  schema: z.record(z.string(), z.any()).optional(),
  /**
   * Experimental. Warnings generated during the search, e.g. when a JQL clause exceeded its argument limit or when the
   * result set was truncated due to an ingestion limit. This field is currently rolling out behind a feature flag and
   * may be absent, empty, or change shape without notice until generally available.
   */
  warnings: z.array(SearchWarningSchema).optional(),
});

export type SearchAndReconcileResults = z.infer<typeof SearchAndReconcileResultsSchema>;
