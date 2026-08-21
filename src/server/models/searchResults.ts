import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueSchema } from './issue';

export const SearchResultsSchema = apiObject({
  expand: z.string().nullish(),
  issues: z.array(IssueSchema).optional(),
  /** The maximum number of results that can be retrieved from the underlying search engine, or null if unlimited */
  maxResultWindow: z.number().optional(),
  /** The number of results to return in this page. */
  maxResults: z.number().optional(),
  names: z.record(z.string(), z.any()).nullish(),
  schema: z.record(z.string(), z.any()).nullish(),
  startAt: z.number().optional(),
  total: z.number().optional(),
  warningMessages: z.array(z.string()).nullish(),
});

export type SearchResults = z.infer<typeof SearchResultsSchema>;
