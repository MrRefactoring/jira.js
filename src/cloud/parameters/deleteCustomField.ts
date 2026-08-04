import { z } from 'zod';

export const DeleteCustomFieldSchema = z.object({
  /** The ID of a custom field. */
  id: z.string(),
});

export type DeleteCustomField = z.input<typeof DeleteCustomFieldSchema>;
