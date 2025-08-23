import { z } from 'zod';

export const CreateFieldConfigurationParametersSchema = z.object({
  /** The description of the field configuration. */
  description: z.string().optional(),
  /** The name of the field configuration. Must be unique. */
  name: z.string(),
});

export type CreateFieldConfigurationParameters = z.infer<typeof CreateFieldConfigurationParametersSchema>;
