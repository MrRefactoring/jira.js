import { z } from 'zod';
import { FieldConfigurationItemSchema } from './fieldConfigurationItem';

export const UpdateFieldConfigurationItemsParametersSchema = z.object({
  /** The ID of the field configuration. */
  id: z.number().int(),
  /** Details of fields in a field configuration. */
  fieldConfigurationItems: z.array(FieldConfigurationItemSchema),
});

export type UpdateFieldConfigurationItemsParameters = z.infer<typeof UpdateFieldConfigurationItemsParametersSchema>;
