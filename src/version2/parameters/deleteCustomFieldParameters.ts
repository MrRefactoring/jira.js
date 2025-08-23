import { z } from 'zod';

export const DeleteCustomFieldParametersSchema = z.object({
  /** The ID of a custom field. */
  id: z.string(),
});

export type DeleteCustomFieldParameters = z.infer<typeof DeleteCustomFieldParametersSchema>;
