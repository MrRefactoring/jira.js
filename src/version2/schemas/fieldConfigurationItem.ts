import { z } from 'zod';

/** A field within a field configuration. */
export const FieldConfigurationItemSchema = z.object({
  /** The description of the field within the field configuration. */
  description: z.string().optional(),
  /** The ID of the field within the field configuration. */
  id: z.string(),
  /** Whether the field is hidden in the field configuration. */
  isHidden: z.boolean().optional(),
  /** Whether the field is required in the field configuration. */
  isRequired: z.boolean().optional(),
  /** The renderer type for the field within the field configuration. */
  renderer: z.string().optional(),
});

export type FieldConfigurationItem = z.infer<typeof FieldConfigurationItemSchema>;
