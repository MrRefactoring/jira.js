import { z } from 'zod';

export const AddFieldSchema = z.object({
  /** The ID of the field to add. */
  fieldId: z.string(),
});

export type AddField = z.infer<typeof AddFieldSchema>;
