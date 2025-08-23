import { z } from 'zod';
import { CustomFieldContextDefaultValueSchema } from './customFieldContextDefaultValue';

/** Default values to update. */
export const CustomFieldContextDefaultValueUpdateSchema = z.object({
  defaultValues: z.array(CustomFieldContextDefaultValueSchema).optional(),
});

export type CustomFieldContextDefaultValueUpdate = z.infer<typeof CustomFieldContextDefaultValueUpdateSchema>;
