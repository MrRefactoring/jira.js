import { z } from 'zod';

export const ExpandForHumansSchema = z.object({
  /** The id of the attachment to expand. */
  id: z.string(),
});

export type ExpandForHumans = z.input<typeof ExpandForHumansSchema>;
