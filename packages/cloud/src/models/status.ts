import { z } from 'zod';
import { IconSchema } from '#/models/icon';

/** The status of the item. */
export const StatusSchema = z.object({
  icon: IconSchema.optional(),
  /**
   * Whether the item is resolved. If set to "true", the link to the issue is displayed in a strikethrough font,
   * otherwise the link displays in normal font.
   */
  resolved: z.boolean().optional(),
});

export type Status = z.infer<typeof StatusSchema>;
