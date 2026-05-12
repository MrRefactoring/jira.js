import { z } from 'zod';
import { SuggestedMappingsForPrioritiesRequestSchema } from '#/models/suggestedMappingsForPrioritiesRequest';
import { SuggestedMappingsForProjectsRequestSchema } from '#/models/suggestedMappingsForProjectsRequest';

/** Details of changes to a priority scheme that require suggested priority mappings. */
export const SuggestedMappingsRequestSchema = z.object({
  /** The maximum number of results that could be on the page. */
  maxResults: z.number().optional(),
  priorities: SuggestedMappingsForPrioritiesRequestSchema.optional(),
  projects: SuggestedMappingsForProjectsRequestSchema.optional(),
  /** The id of the priority scheme. */
  schemeId: z.number().optional(),
  /** The index of the first item returned on the page. */
  startAt: z.number().optional(),
});

export type SuggestedMappingsRequest = z.infer<typeof SuggestedMappingsRequestSchema>;
