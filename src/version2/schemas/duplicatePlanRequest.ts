import { z } from 'zod';

export const DuplicatePlanRequestSchema = z.object({
  /** The plan name. */
  name: z.string(),
});

export type DuplicatePlanRequest = z.infer<typeof DuplicatePlanRequestSchema>;
