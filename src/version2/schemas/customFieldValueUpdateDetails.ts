import { z } from 'zod';
import { CustomFieldValueUpdateSchema } from './customFieldValueUpdate';

/** Details of updates for a custom field. */
export const CustomFieldValueUpdateDetailsSchema = z.object({
  /** The list of custom field update details. */
  updates: z.array(CustomFieldValueUpdateSchema).optional(),
});

export type CustomFieldValueUpdateDetails = z.infer<typeof CustomFieldValueUpdateDetailsSchema>;
