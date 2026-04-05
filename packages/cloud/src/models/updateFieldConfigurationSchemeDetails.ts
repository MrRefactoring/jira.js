import { z } from 'zod';

/** The details of the field configuration scheme. */
export const UpdateFieldConfigurationSchemeDetailsSchema = z.object({
  /** The description of the field configuration scheme. */
  description: z.string().max(1024, 'description must be at most 1024 characters').optional(),
  /** The name of the field configuration scheme. The name must be unique. */
  name: z.string().max(255, 'name must be at most 255 characters'),
});

export type UpdateFieldConfigurationSchemeDetails = z.infer<typeof UpdateFieldConfigurationSchemeDetailsSchema>;
