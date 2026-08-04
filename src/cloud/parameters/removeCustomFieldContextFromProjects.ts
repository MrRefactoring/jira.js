import { z } from 'zod';
import { ProjectIdsSchema } from '../models';

export const RemoveCustomFieldContextFromProjectsSchema = z.object({}).extend(ProjectIdsSchema.shape).extend({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number(),
});

export type RemoveCustomFieldContextFromProjects = z.input<typeof RemoveCustomFieldContextFromProjectsSchema>;
