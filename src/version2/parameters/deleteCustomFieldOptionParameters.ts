import { z } from 'zod';

export const DeleteCustomFieldOptionParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context from which an option should be deleted. */
  contextId: z.number().int(),
  /** The ID of the option to delete. */
  optionId: z.number().int(),
});

export type DeleteCustomFieldOptionParameters = z.infer<typeof DeleteCustomFieldOptionParametersSchema>;
