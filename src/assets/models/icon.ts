import { z } from 'zod';
import { apiObject } from '#/core';
/** A visual representation of something, usually associated as the icon of an object type */

export const IconSchema = apiObject({
  id: z.string(),
  name: z.string(),
  /** A url to the icon to display with small resolution */
  url16: z.string(),
  /** A url to the icon to display with large resolution */
  url48: z.string(),
});

export type Icon = z.infer<typeof IconSchema>;
