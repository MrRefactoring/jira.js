import { z } from 'zod';

export const GetResolutionSchema = z.object({
  /** A String containing the resolution id. */
  id: z.string(),
});

export type GetResolution = z.input<typeof GetResolutionSchema>;
