import { z } from 'zod';

export const AddFieldToDefaultScreenSchema = z.object({
  fieldId: z.string(),
});

export type AddFieldToDefaultScreen = z.input<typeof AddFieldToDefaultScreenSchema>;
