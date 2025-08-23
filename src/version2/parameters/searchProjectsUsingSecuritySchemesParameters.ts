import { z } from 'zod';

export const SearchProjectsUsingSecuritySchemesParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.string().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.string().optional(),
  /** The list of security scheme IDs to be filtered out. */
  issueSecuritySchemeId: z.array(z.string()).optional(),
  /** The list of project IDs to be filtered out. */
  projectId: z.array(z.string()).optional(),
});

export type SearchProjectsUsingSecuritySchemesParameters = z.infer<
  typeof SearchProjectsUsingSecuritySchemesParametersSchema
>;
