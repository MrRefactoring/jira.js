import { z } from 'zod';

/** Details of an issue resolution. */
export const UpdateResolutionDetailsSchema = z.object({
  /** The description of the resolution. */
  description: z.string().max(255, 'description must be at most 255 characters').optional(),
  /** The name of the resolution. Must be unique. */
  name: z.string().max(60, 'name must be at most 60 characters'),
});

export type UpdateResolutionDetails = z.infer<typeof UpdateResolutionDetailsSchema>;
