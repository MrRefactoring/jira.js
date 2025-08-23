import { z } from 'zod';

export const GetPrioritySchemesParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.string().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.string().optional(),
  /**
   * A set of priority IDs to filter by. To include multiple IDs, provide an ampersand-separated list. For example,
   * `priorityId=10000&priorityId=10001`.
   */
  priorityId: z.array(z.number().int()).optional(),
  /**
   * A set of priority scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example,
   * `schemeId=10000&schemeId=10001`.
   */
  schemeId: z.array(z.number().int()).optional(),
  /** The name of scheme to search for. */
  schemeName: z.string().optional(),
  /** Whether only the default priority is returned. */
  onlyDefault: z.boolean().optional(),
  /** The ordering to return the priority schemes by. */
  orderBy: z.enum(['name', '+name', '-name']).optional(),
  /**
   * A comma separated list of additional information to return. "priorities" will return priorities associated with the
   * priority scheme. "projects" will return projects associated with the priority scheme.
   * `expand=priorities,projects`.
   */
  expand: z.string().optional(),
});

export type GetPrioritySchemesParameters = z.infer<typeof GetPrioritySchemesParametersSchema>;
