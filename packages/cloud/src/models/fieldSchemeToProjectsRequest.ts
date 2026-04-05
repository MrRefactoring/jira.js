import { z } from 'zod';

/** Request for associating field schemes to projects. */
export const FieldSchemeToProjectsRequestSchema = z.object({
  /** List of project IDs to associate with field schemes */
  projectIds: z.array(z.number()),
});

export type FieldSchemeToProjectsRequest = z.infer<typeof FieldSchemeToProjectsRequestSchema>;
