import type { z } from 'zod';
import { apiObject } from '#/core';
import { PrioritySchemeWithPaginatedPrioritiesAndProjectsSchema } from './prioritySchemeWithPaginatedPrioritiesAndProjects';
import { TaskProgressJsonNodeSchema } from './taskProgressJsonNode';
/** Details of the updated priority scheme. */

export const UpdatePrioritySchemeResponseSchema = apiObject({
  priorityScheme: PrioritySchemeWithPaginatedPrioritiesAndProjectsSchema.optional(),
  task: TaskProgressJsonNodeSchema.optional(),
});

export type UpdatePrioritySchemeResponse = z.infer<typeof UpdatePrioritySchemeResponseSchema>;
