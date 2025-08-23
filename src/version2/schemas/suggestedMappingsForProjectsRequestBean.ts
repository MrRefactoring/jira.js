import { z } from 'zod';

/** Details of changes to a priority scheme's projects that require suggested priority mappings. */
export const SuggestedMappingsForProjectsRequestBeanSchema = z.object({
  /** The ids of projects being added to the scheme. */
  add: z.array(z.number().int()).optional(),
});

export type SuggestedMappingsForProjectsRequestBean = z.infer<typeof SuggestedMappingsForProjectsRequestBeanSchema>;
