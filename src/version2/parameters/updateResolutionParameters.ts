import { z } from 'zod';

export const UpdateResolutionParametersSchema = z.object({
  /** The ID of the issue resolution. */
  id: z.string(),
  /** The description of the resolution. */
  description: z.string().optional(),
  /** The name of the resolution. Must be unique. */
  name: z.string(),
});

export type UpdateResolutionParameters = z.infer<typeof UpdateResolutionParametersSchema>;
