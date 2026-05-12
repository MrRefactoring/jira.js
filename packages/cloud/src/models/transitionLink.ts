import { z } from 'zod';

/** Link information for workflow transitions. */
export const TransitionLinkSchema = z.object({
  /** The from port number. */
  fromPort: z.number().optional(),
  /** The from status reference. */
  fromStatusReference: z.string().optional(),
  /** The to port number. */
  toPort: z.number().optional(),
});

export type TransitionLink = z.infer<typeof TransitionLinkSchema>;
