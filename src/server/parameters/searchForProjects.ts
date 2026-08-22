import { z } from 'zod';

export const SearchForProjectsSchema = z.object({
  /** Maximum number of matches to return. Zero means a default limit of 100 and negative numbers return no results. */
  maxResults: z.number().optional(),
  /** A sequence of characters expected to be found in the word-prefix of project name and/or key. */
  query: z.string().optional(),
  /**
   * If true, and the query is empty, the method will return first results limited to the value of 'maxResults' or
   * default limit of 100.
   */
  allowEmptyQuery: z.boolean().optional(),
});

export type SearchForProjects = z.input<typeof SearchForProjectsSchema>;
