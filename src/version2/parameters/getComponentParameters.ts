import { z } from 'zod';

export const GetComponentParametersSchema = z.object({
  /** The ID of the component. */
  id: z.string(),
});

export type GetComponentParameters = z.infer<typeof GetComponentParametersSchema>;
