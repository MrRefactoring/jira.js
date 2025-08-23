import { z } from 'zod';

export const DeleteFieldConfigurationSchemeParametersSchema = z.object({
  /** The ID of the field configuration scheme. */
  id: z.number().int(),
});

export type DeleteFieldConfigurationSchemeParameters = z.infer<typeof DeleteFieldConfigurationSchemeParametersSchema>;
