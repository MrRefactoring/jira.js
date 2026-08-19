import { z } from 'zod';
import { ProjectIdsSchema } from '../models';

export const AssignProjectsToCustomFieldContextSchema = z.object(ProjectIdsSchema.shape).extend({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number(),
});

export type AssignProjectsToCustomFieldContext = z.input<typeof AssignProjectsToCustomFieldContextSchema>;
