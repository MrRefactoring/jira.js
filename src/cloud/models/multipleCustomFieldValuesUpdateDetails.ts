import { z } from 'zod';
import { apiObject } from '#/core';
import { MultipleCustomFieldValuesUpdateSchema } from './multipleCustomFieldValuesUpdate';
/** List of updates for a custom fields. */

export const MultipleCustomFieldValuesUpdateDetailsSchema = apiObject({
  updates: z.array(MultipleCustomFieldValuesUpdateSchema).optional(),
});

export type MultipleCustomFieldValuesUpdateDetails = z.infer<typeof MultipleCustomFieldValuesUpdateDetailsSchema>;
