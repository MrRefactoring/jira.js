import { z } from 'zod';

/** Update projects in a scheme */
export const UpdateProjectsInSchemeRequestBeanSchema = z.object({
  /** Projects to add to a scheme */
  add: z.unknown().optional(),
  /** Projects to remove from a scheme */
  remove: z.unknown().optional(),
});

export type UpdateProjectsInSchemeRequestBean = z.infer<typeof UpdateProjectsInSchemeRequestBeanSchema>;
