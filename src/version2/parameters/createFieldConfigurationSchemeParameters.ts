import { z } from 'zod';

export const CreateFieldConfigurationSchemeParametersSchema = z.object({
  /** The description of the field configuration scheme. */
  description: z.string().optional(),
  /** The name of the field configuration scheme. The name must be unique. */
  name: z.string(),
});

export type CreateFieldConfigurationSchemeParameters = z.infer<typeof CreateFieldConfigurationSchemeParametersSchema>;
