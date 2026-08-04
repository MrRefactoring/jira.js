import { z } from 'zod';

export const AddFieldToDefaultScreenSchema = z.object({
  /** The ID of the field. */
  fieldId: z.string(),
});

export type AddFieldToDefaultScreen = z.input<typeof AddFieldToDefaultScreenSchema>;
