import { z } from 'zod';

export const DeleteCustomFieldContextParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number().int(),
});

export type DeleteCustomFieldContextParameters = z.infer<typeof DeleteCustomFieldContextParametersSchema>;
