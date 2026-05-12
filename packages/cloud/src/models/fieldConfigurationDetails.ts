import { z } from 'zod';

/** Details of a field configuration. */
export const FieldConfigurationDetailsSchema = z.object({
  /** The description of the field configuration. */
  description: z.string().max(255, 'description must be at most 255 characters').optional(),
  /** The name of the field configuration. Must be unique. */
  name: z.string().max(255, 'name must be at most 255 characters'),
});

export type FieldConfigurationDetails = z.infer<typeof FieldConfigurationDetailsSchema>;
