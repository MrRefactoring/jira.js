import { z } from 'zod';

/** A priority scheme with less fields to be used in for an API expand response. */
export const ExpandPrioritySchemeSchema = z.object({
  /** The ID of the priority scheme. */
  id: z.string().optional(),
  /** The name of the priority scheme. */
  name: z.string().optional(),
  /** The URL of the priority scheme. */
  self: z.string().optional(),
});

export type ExpandPriorityScheme = z.infer<typeof ExpandPrioritySchemeSchema>;
