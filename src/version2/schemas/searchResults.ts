import { z } from 'zod';
import { IssueBeanSchema } from './issueBean';

/** The result of a JQL search. */
export const SearchResultsSchema = z.object({
  /** Expand options that include additional search result details in the response. */
  expand: z.string().optional(),
  /** The list of issues found by the search. */
  issues: z.array(IssueBeanSchema).optional(),
  /** The maximum number of results that could be on the page. */
  maxResults: z.number().int().optional(),
  /** The ID and name of each field in the search results. */
  names: z.object({}).optional(),
  /** The schema describing the field types in the search results. */
  schema: z.object({}).optional(),
  /** The index of the first item returned on the page. */
  startAt: z.number().int().optional(),
  /** The number of results on the page. */
  total: z.number().int().optional(),
  /** Any warnings related to the JQL query. */
  warningMessages: z.array(z.string()).optional(),
});

export type SearchResults = z.infer<typeof SearchResultsSchema>;
