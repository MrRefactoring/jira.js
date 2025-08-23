import { z } from 'zod';

/** Details of an issue resolution. */
export const UpdateResolutionDetailsSchema = z.object({
  /** The description of the resolution. */
  description: z.string().optional(),
  /** The name of the resolution. Must be unique. */
  name: z.string(),
});

export type UpdateResolutionDetails = z.infer<typeof UpdateResolutionDetailsSchema>;
