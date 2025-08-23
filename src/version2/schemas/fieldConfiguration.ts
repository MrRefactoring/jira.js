import { z } from 'zod';

/** Details of a field configuration. */
export const FieldConfigurationSchema = z.object({
  /** The description of the field configuration. */
  description: z.string(),
  /** The ID of the field configuration. */
  id: z.number().int(),
  /** Whether the field configuration is the default. */
  isDefault: z.boolean().optional(),
  /** The name of the field configuration. */
  name: z.string(),
});

export type FieldConfiguration = z.infer<typeof FieldConfigurationSchema>;
