import { z } from 'zod';

export const CreateResolutionParametersSchema = z.object({
  /** The description of the resolution. */
  description: z.string().optional(),
  /** The name of the resolution. Must be unique (case-insensitive). */
  name: z.string(),
});

export type CreateResolutionParameters = z.infer<typeof CreateResolutionParametersSchema>;
