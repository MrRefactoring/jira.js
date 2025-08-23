import { z } from 'zod';
import { PrioritySchemeWithPaginatedPrioritiesAndProjectsSchema } from './prioritySchemeWithPaginatedPrioritiesAndProjects';

/** Details of the updated priority scheme. */
export const UpdatePrioritySchemeResponseBeanSchema = z.object({
  priorityScheme: PrioritySchemeWithPaginatedPrioritiesAndProjectsSchema.optional(),
  /** The in-progress issue migration task. */
  task: z.unknown().optional(),
});

export type UpdatePrioritySchemeResponseBean = z.infer<typeof UpdatePrioritySchemeResponseBeanSchema>;
