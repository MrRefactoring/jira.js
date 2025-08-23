import { z } from 'zod';

export const DeleteFieldConfigurationParametersSchema = z.object({
  /** The ID of the field configuration. */
  id: z.number().int(),
});

export type DeleteFieldConfigurationParameters = z.infer<typeof DeleteFieldConfigurationParametersSchema>;
