import { z } from 'zod';

/** Response item returned from get projects with field schemes. */
export const GetProjectsWithFieldSchemesResponseSchema = z.object({
  projectId: z.number().optional(),
  schemeId: z.number().optional(),
});

export type GetProjectsWithFieldSchemesResponse = z.infer<typeof GetProjectsWithFieldSchemesResponseSchema>;
