import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomFieldValueUpdateSchema } from './customFieldValueUpdate';
/** Details of updates for a custom field. */

export const CustomFieldValueUpdateDetailsSchema = apiObject({
  /** The list of custom field update details. */
  updates: z.array(CustomFieldValueUpdateSchema).optional(),
});

export type CustomFieldValueUpdateDetails = z.infer<typeof CustomFieldValueUpdateDetailsSchema>;
