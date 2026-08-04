import { z } from 'zod';
import { apiObject } from '#/core';
/** Details of a screen. */

export const ScreenDetailsSchema = apiObject({
  /** The description of the screen. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the screen. The name must be unique. The maximum length is 255 characters. */
  name: z.string(),
});

export type ScreenDetails = z.infer<typeof ScreenDetailsSchema>;
