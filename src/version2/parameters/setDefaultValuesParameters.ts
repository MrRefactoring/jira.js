import { z } from 'zod';
import { CustomFieldContextDefaultValueSchema } from './customFieldContextDefaultValue';

export const SetDefaultValuesParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  defaultValues: z.array(CustomFieldContextDefaultValueSchema).optional(),
});

export type SetDefaultValuesParameters = z.infer<typeof SetDefaultValuesParametersSchema>;
