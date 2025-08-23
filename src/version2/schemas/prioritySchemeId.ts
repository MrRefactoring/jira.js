import { z } from 'zod';

/** The ID of a priority scheme. */
export const PrioritySchemeIdSchema = z.object({
  /** The ID of the priority scheme. */
  id: z.string().optional(),
  /** The in-progress issue migration task. */
  task: z.unknown().optional(),
});

export type PrioritySchemeId = z.infer<typeof PrioritySchemeIdSchema>;
