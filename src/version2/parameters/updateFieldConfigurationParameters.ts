import { z } from 'zod';

export const UpdateFieldConfigurationParametersSchema = z.object({
  /** The ID of the field configuration. */
  id: z.number().int(),
  /** The description of the field configuration. */
  description: z.string().optional(),
  /** The name of the field configuration. Must be unique. */
  name: z.string(),
});

export type UpdateFieldConfigurationParameters = z.infer<typeof UpdateFieldConfigurationParametersSchema>;
