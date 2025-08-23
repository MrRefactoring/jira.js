import { z } from 'zod';

export const AssignProjectsToCustomFieldContextParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number().int(),
  /** The IDs of projects. */
  projectIds: z.array(z.string()),
});

export type AssignProjectsToCustomFieldContextParameters = z.infer<
  typeof AssignProjectsToCustomFieldContextParametersSchema
>;
