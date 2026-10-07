import { z } from 'zod';

export const GetPaginatedComponentsSchema = z.object({
  /** The maximum number of components to return */
  maxResults: z.number().optional(),
  /** The string that components names will be matched with */
  query: z.string().optional(),
  /** The set of project ids to filter components */
  projectIds: z.string().optional(),
  /** The index of the first components to return */
  startAt: z.number().optional(),
});

export type GetPaginatedComponents = z.input<typeof GetPaginatedComponentsSchema>;
