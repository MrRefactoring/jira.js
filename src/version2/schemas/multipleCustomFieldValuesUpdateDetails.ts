import { z } from 'zod';
import { MultipleCustomFieldValuesUpdateSchema } from './multipleCustomFieldValuesUpdate';

/** List of updates for a custom fields. */
export const MultipleCustomFieldValuesUpdateDetailsSchema = z.object({
  updates: z.array(MultipleCustomFieldValuesUpdateSchema).optional(),
});

export type MultipleCustomFieldValuesUpdateDetails = z.infer<typeof MultipleCustomFieldValuesUpdateDetailsSchema>;
