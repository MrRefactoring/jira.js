import { z } from 'zod';

/** Details of a field configuration scheme. */
export const FieldConfigurationSchemeSchema = z.object({
  /** The description of the field configuration scheme. */
  description: z.string().optional(),
  /** The ID of the field configuration scheme. */
  id: z.string(),
  /** The name of the field configuration scheme. */
  name: z.string(),
});

export type FieldConfigurationScheme = z.infer<typeof FieldConfigurationSchemeSchema>;
