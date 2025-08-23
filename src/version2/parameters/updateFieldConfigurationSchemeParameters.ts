import { z } from 'zod';

export const UpdateFieldConfigurationSchemeParametersSchema = z.object({
  /** The ID of the field configuration scheme. */
  id: z.number().int(),
  /** The description of the field configuration scheme. */
  description: z.string().optional(),
  /** The name of the field configuration scheme. The name must be unique. */
  name: z.string(),
});

export type UpdateFieldConfigurationSchemeParameters = z.infer<typeof UpdateFieldConfigurationSchemeParametersSchema>;
