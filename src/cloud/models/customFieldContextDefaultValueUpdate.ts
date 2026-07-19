import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomFieldContextDefaultValueSchema } from './customFieldContextDefaultValue';
/** Default values to update. */

export const CustomFieldContextDefaultValueUpdateSchema = apiObject({
  defaultValues: z.array(CustomFieldContextDefaultValueSchema).optional(),
});

export type CustomFieldContextDefaultValueUpdate = z.infer<typeof CustomFieldContextDefaultValueUpdateSchema>;
