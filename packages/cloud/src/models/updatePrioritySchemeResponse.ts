import { z } from 'zod';
import { PrioritySchemeWithPaginatedPrioritiesAndProjectsSchema } from '#/models/prioritySchemeWithPaginatedPrioritiesAndProjects';
import { TaskProgressJsonNodeSchema } from '#/models/taskProgressJsonNode';

/** Details of the updated priority scheme. */
export const UpdatePrioritySchemeResponseSchema = z.object({
  priorityScheme: PrioritySchemeWithPaginatedPrioritiesAndProjectsSchema.optional(),
  task: TaskProgressJsonNodeSchema.optional(),
});

export type UpdatePrioritySchemeResponse = z.infer<typeof UpdatePrioritySchemeResponseSchema>;
