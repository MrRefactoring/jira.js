import { z } from 'zod';

/** The details of the field configuration scheme. */
export const UpdateFieldConfigurationSchemeDetailsSchema = z.object({
  /** The description of the field configuration scheme. */
  description: z.string().optional(),
  /** The name of the field configuration scheme. The name must be unique. */
  name: z.string(),
});

export type UpdateFieldConfigurationSchemeDetails = z.infer<typeof UpdateFieldConfigurationSchemeDetailsSchema>;
