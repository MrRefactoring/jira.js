import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldConfigurationItemSchema } from './fieldConfigurationItem';
/** Details of field configuration items. */

export const FieldConfigurationItemsDetailsSchema = apiObject({
  /** Details of fields in a field configuration. */
  fieldConfigurationItems: z.array(FieldConfigurationItemSchema),
});

export type FieldConfigurationItemsDetails = z.infer<typeof FieldConfigurationItemsDetailsSchema>;
