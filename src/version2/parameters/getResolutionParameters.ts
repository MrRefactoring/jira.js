import { z } from 'zod';

export const GetResolutionParametersSchema = z.object({
  /** The ID of the issue resolution value. */
  id: z.string(),
});

export type GetResolutionParameters = z.infer<typeof GetResolutionParametersSchema>;
