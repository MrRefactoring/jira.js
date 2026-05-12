import { z } from 'zod';
import { ProjectIdsSchema } from '../models';

export const AssignProjectsToCustomFieldContextSchema = z
  .object({
    /** The ID of the custom field. */
    fieldId: z.string(),
    /** The ID of the context. */
    contextId: z.number(),
  })
  .extend(ProjectIdsSchema.shape);

export type AssignProjectsToCustomFieldContext = z.input<typeof AssignProjectsToCustomFieldContextSchema>;
