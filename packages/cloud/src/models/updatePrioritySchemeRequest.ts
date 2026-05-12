import { z } from 'zod';
import { PriorityMappingSchema } from '#/models/priorityMapping';
import { UpdatePrioritiesInSchemeRequestSchema } from '#/models/updatePrioritiesInSchemeRequest';
import { UpdateProjectsInSchemeRequestSchema } from '#/models/updateProjectsInSchemeRequest';

/** Details of a priority scheme. */
export const UpdatePrioritySchemeRequestSchema = z.object({
  /** The default priority of the scheme. */
  defaultPriorityId: z.number().optional(),
  /** The description of the priority scheme. */
  description: z.string().max(4000, 'description must be at most 4000 characters').optional(),
  mappings: PriorityMappingSchema.optional(),
  /** The name of the priority scheme. Must be unique. */
  name: z.string().max(255, 'name must be at most 255 characters').optional(),
  priorities: UpdatePrioritiesInSchemeRequestSchema.optional(),
  projects: UpdateProjectsInSchemeRequestSchema.optional(),
});

export type UpdatePrioritySchemeRequest = z.infer<typeof UpdatePrioritySchemeRequestSchema>;
