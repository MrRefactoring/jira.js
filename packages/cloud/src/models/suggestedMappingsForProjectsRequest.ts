import { z } from 'zod';

/** Details of changes to a priority scheme's projects that require suggested priority mappings. */
export const SuggestedMappingsForProjectsRequestSchema = z.object({
  /** The ids of projects being added to the scheme. */
  add: z.array(z.number()).optional(),
});

export type SuggestedMappingsForProjectsRequest = z.infer<typeof SuggestedMappingsForProjectsRequestSchema>;
