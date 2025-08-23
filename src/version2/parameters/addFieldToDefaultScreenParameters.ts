import { z } from 'zod';

export const AddFieldToDefaultScreenParametersSchema = z.object({
  /** The ID of the field. */
  fieldId: z.string(),
});

export type AddFieldToDefaultScreenParameters = z.infer<typeof AddFieldToDefaultScreenParametersSchema>;
