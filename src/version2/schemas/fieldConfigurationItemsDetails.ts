import { z } from 'zod';
import { FieldConfigurationItemSchema } from './fieldConfigurationItem';

/** Details of field configuration items. */
export const FieldConfigurationItemsDetailsSchema = z.object({
  /** Details of fields in a field configuration. */
  fieldConfigurationItems: z.array(FieldConfigurationItemSchema),
});

export type FieldConfigurationItemsDetails = z.infer<typeof FieldConfigurationItemsDetailsSchema>;
