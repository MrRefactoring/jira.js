import { z } from 'zod';
import { apiObject } from '#/core';
/** A screen tab. */

export const ScreenableTabSchema = apiObject({
  /** The ID of the screen tab. */
  id: z.number().optional(),
  /** The name of the screen tab. The maximum length is 255 characters. */
  name: z.string(),
});

export type ScreenableTab = z.infer<typeof ScreenableTabSchema>;
