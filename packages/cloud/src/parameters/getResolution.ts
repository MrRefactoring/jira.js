import { z } from 'zod';

export const GetResolutionSchema = z.object({
  /** The ID of the issue resolution value. */
  id: z.string(),
});

export type GetResolution = z.input<typeof GetResolutionSchema>;
