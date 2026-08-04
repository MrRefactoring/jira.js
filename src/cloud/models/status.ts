import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema } from './icon';
/** The status of the item. */

export const StatusSchema = apiObject({
  icon: IconSchema.optional(),
  /**
   * Whether the item is resolved. If set to "true", the link to the issue is displayed in a strikethrough font,
   * otherwise the link displays in normal font.
   */
  resolved: z.boolean().optional(),
});

export type Status = z.infer<typeof StatusSchema>;
