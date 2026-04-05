import { z } from 'zod';

/** A group label. */
export const GroupLabelSchema = z.object({
  /** The group label name. */
  text: z.string().optional(),
  /** The title of the group label. */
  title: z.string().optional(),
  /** The type of the group label. */
  type: z.enum(['ADMIN', 'SINGLE', 'MULTIPLE']).optional(),
});

export type GroupLabel = z.infer<typeof GroupLabelSchema>;
