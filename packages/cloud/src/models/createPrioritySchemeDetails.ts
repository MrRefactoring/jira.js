import { z } from 'zod';
import { PriorityMappingSchema } from '#/models/priorityMapping';

/** Details of a new priority scheme */
export const CreatePrioritySchemeDetailsSchema = z.object({
  /** The ID of the default priority for the priority scheme. */
  defaultPriorityId: z.number(),
  /** The description of the priority scheme. */
  description: z.string().max(4000, 'description must be at most 4000 characters').optional(),
  mappings: PriorityMappingSchema.optional(),
  /** The name of the priority scheme. Must be unique. */
  name: z.string().max(255, 'name must be at most 255 characters'),
  /** The IDs of priorities in the scheme. */
  priorityIds: z.array(z.number()),
  /** The IDs of projects that will use the priority scheme. */
  projectIds: z.array(z.number()).optional(),
});

export type CreatePrioritySchemeDetails = z.infer<typeof CreatePrioritySchemeDetailsSchema>;
