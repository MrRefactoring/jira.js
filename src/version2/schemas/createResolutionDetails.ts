import { z } from 'zod';

/** Details of an issue resolution. */
export const CreateResolutionDetailsSchema = z.object({
  /** The description of the resolution. */
  description: z.string().optional(),
  /** The name of the resolution. Must be unique (case-insensitive). */
  name: z.string(),
});

export type CreateResolutionDetails = z.infer<typeof CreateResolutionDetailsSchema>;
