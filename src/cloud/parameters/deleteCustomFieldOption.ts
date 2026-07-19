import { z } from 'zod';

export const DeleteCustomFieldOptionSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context from which an option should be deleted. */
  contextId: z.number(),
  /** The ID of the option to delete. */
  optionId: z.number(),
});

export type DeleteCustomFieldOption = z.input<typeof DeleteCustomFieldOptionSchema>;
