import { z } from 'zod';
import { PagePriorityWithSequenceSchema } from '#/models/pagePriorityWithSequence';
import { PageProjectDetailsSchema } from '#/models/pageProjectDetails';

/** A priority scheme with paginated priorities and projects. */
export const PrioritySchemeWithPaginatedPrioritiesAndProjectsSchema = z.object({
  default: z.boolean().optional(),
  /** The ID of the default issue priority. */
  defaultPriorityId: z.string().optional(),
  /** The description of the priority scheme */
  description: z.string().optional(),
  /** The ID of the priority scheme. */
  id: z.string(),
  isDefault: z.boolean().optional(),
  /** The name of the priority scheme */
  name: z.string(),
  priorities: PagePriorityWithSequenceSchema.optional(),
  projects: PageProjectDetailsSchema.optional(),
  /** The URL of the priority scheme. */
  self: z.string().optional(),
});

export type PrioritySchemeWithPaginatedPrioritiesAndProjects = z.infer<
  typeof PrioritySchemeWithPaginatedPrioritiesAndProjectsSchema
>;
