import { z } from 'zod';

export const DeleteCustomFieldContextSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number(),
});

export type DeleteCustomFieldContext = z.input<typeof DeleteCustomFieldContextSchema>;
