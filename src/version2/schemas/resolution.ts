import { z } from 'zod';

/** Details of an issue resolution. */
export const ResolutionSchema = z.object({
  /** The description of the issue resolution. */
  description: z.string().optional(),
  /** The ID of the issue resolution. */
  id: z.string().optional(),
  /** The name of the issue resolution. */
  name: z.string().optional(),
  /** The URL of the issue resolution. */
  self: z.string().optional(),
});

export type Resolution = z.infer<typeof ResolutionSchema>;
