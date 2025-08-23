import { z } from 'zod';

export const GetProjectsByPrioritySchemeParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.string().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.string().optional(),
  /** The project IDs to filter by. For example, `projectId=10000&projectId=10001`. */
  projectId: z.array(z.number().int()).optional(),
  /** The priority scheme ID. */
  schemeId: z.string(),
  /** The string to query projects on by name. */
  query: z.string().optional(),
});

export type GetProjectsByPrioritySchemeParameters = z.infer<typeof GetProjectsByPrioritySchemeParametersSchema>;
