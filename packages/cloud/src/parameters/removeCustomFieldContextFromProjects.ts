import { z } from 'zod';
import { ProjectIdsSchema } from '../models';

export const RemoveCustomFieldContextFromProjectsSchema = z
  .object({
    /** The ID of the custom field. */
    fieldId: z.string(),
    /** The ID of the context. */
    contextId: z.number(),
  })
  .extend(ProjectIdsSchema.shape);

export type RemoveCustomFieldContextFromProjects = z.input<typeof RemoveCustomFieldContextFromProjectsSchema>;
