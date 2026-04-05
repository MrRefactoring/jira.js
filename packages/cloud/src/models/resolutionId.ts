import { z } from 'zod';

/** The ID of an issue resolution. */
export const ResolutionIdSchema = z.object({
  /** The ID of the issue resolution. */
  id: z.string(),
});

export type ResolutionId = z.infer<typeof ResolutionIdSchema>;
