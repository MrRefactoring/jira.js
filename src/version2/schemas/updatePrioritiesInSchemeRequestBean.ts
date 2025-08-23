import { z } from 'zod';

/** Update priorities in a scheme */
export const UpdatePrioritiesInSchemeRequestBeanSchema = z.object({
  /** Priorities to add to a scheme */
  add: z.unknown().optional(),
  /** Priorities to remove from a scheme */
  remove: z.unknown().optional(),
});

export type UpdatePrioritiesInSchemeRequestBean = z.infer<typeof UpdatePrioritiesInSchemeRequestBeanSchema>;
