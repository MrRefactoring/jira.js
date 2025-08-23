import { z } from 'zod';

/** Details of a field configuration. */
export const FieldConfigurationDetailsSchema = z.object({
  /** The description of the field configuration. */
  description: z.string().optional(),
  /** The name of the field configuration. Must be unique. */
  name: z.string(),
});

export type FieldConfigurationDetails = z.infer<typeof FieldConfigurationDetailsSchema>;
