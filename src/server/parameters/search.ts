import { z } from 'zod';

export const SearchSchema = z.object({
  /** A comma-separated list of the parameters to expand */
  expand: z.union([z.string(), z.array(z.string())]).optional(),
  /** A JQL query string */
  jql: z.string().optional(),
  /** The maximum number of issues to return (defaults to 50) */
  maxResults: z.number().optional(),
  /** Whether to validate the JQL query */
  validateQuery: z.boolean().optional(),
  /** The list of fields to return for each issue */
  fields: z.union([z.string(), z.array(z.string())]).optional(),
  /** The index of the first issue to return (0-based) */
  startAt: z.number().optional(),
});

export type Search = z.input<typeof SearchSchema>;
