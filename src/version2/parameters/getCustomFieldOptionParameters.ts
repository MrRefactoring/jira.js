import { z } from 'zod';

export const GetCustomFieldOptionParametersSchema = z.object({
  /** The ID of the custom field option. */
  id: z.string(),
});

export type GetCustomFieldOptionParameters = z.infer<typeof GetCustomFieldOptionParametersSchema>;
