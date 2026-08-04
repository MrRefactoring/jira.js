import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of changes to a priority scheme's projects that require suggested priority mappings. */

export const SuggestedMappingsForProjectsRequestSchema = apiObject({
  /** The ids of projects being added to the scheme. */
  add: z.array(z.number()).optional(),
});

export type SuggestedMappingsForProjectsRequest = z.infer<typeof SuggestedMappingsForProjectsRequestSchema>;
