import { z } from 'zod';

export const FindGroupsSchema = z.object({
  /** Maximum number of results to return */
  maxResults: z.string().optional(),
  /** A String to match groups against */
  query: z.string().optional(),
  /** List of groups to exclude */
  exclude: z.string().optional(),
  /** Username for the context */
  userName: z.string().optional(),
});

export type FindGroups = z.input<typeof FindGroupsSchema>;
