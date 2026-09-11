import { z } from 'zod';

export const GetPaginatedVersionsSchema = z.object({
  /** Maximum number of versions to return */
  maxResults: z.number().optional(),
  /** String that version names will be matched with */
  query: z.string().optional(),
  /** Set of project IDs to filter versions with */
  projectIds: z.array(z.number()).optional(),
  /** Index of the first version to return */
  startAt: z.number().optional(),
});

export type GetPaginatedVersions = z.input<typeof GetPaginatedVersionsSchema>;
