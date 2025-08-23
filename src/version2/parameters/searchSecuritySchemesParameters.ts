import { z } from 'zod';

export const SearchSecuritySchemesParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.string().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.string().optional(),
  /**
   * The list of issue security scheme IDs. To include multiple issue security scheme IDs, separate IDs with an
   * ampersand: `id=10000&id=10001`.
   */
  id: z.array(z.string()).optional(),
  /**
   * The list of project IDs. To include multiple project IDs, separate IDs with an ampersand:
   * `projectId=10000&projectId=10001`.
   */
  projectId: z.array(z.string()).optional(),
});

export type SearchSecuritySchemesParameters = z.infer<typeof SearchSecuritySchemesParametersSchema>;
