import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueSchema } from './issue';
/** The result of an issue search in Jira Software APIs. */

export const SoftwareIssueResultsSchema = apiObject({
  /** Expand options that include additional search result details in the response. */
  expand: z.string().optional(),
  /** Indicates whether this is the last page of the paginated response. */
  isLast: z.boolean(),
  /** The list of issues found by the search. */
  issues: z.array(IssueSchema),
  /** The ID and name of each field in the search results. */
  names: z.record(z.string(), z.any()).optional(),
  /**
   * Continuation token to fetch the next page. If this result represents the last or only page, this token will be
   * null.
   */
  nextPageToken: z.string().optional(),
  /** The schema describing the field types in the search results. */
  schema: z.record(z.string(), z.any()).optional(),
  /** Any warnings related to the JQL query. */
  warningMessages: z.array(z.string()).optional(),
});

export type SoftwareIssueResults = z.infer<typeof SoftwareIssueResultsSchema>;
