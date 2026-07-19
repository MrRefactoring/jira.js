import { z } from 'zod';
import { apiObject } from '#/core';
/** An icon. */

export const IconSchema = apiObject({
  /** The URL of the tooltip, used only for a status icon. */
  link: z.string().optional(),
  /** The title of the icon, for use as a tooltip on the icon. */
  title: z.string().optional(),
  /** The URL of a 16x16 pixel icon. */
  url16x16: z.string().optional(),
});

export type Icon = z.infer<typeof IconSchema>;
