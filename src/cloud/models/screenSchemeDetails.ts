import { z } from 'zod';
import { apiObject } from '#/core';
import { ScreenTypesSchema } from './screenTypes';
/** Details of a screen scheme. */

export const ScreenSchemeDetailsSchema = apiObject({
  /** The description of the screen scheme. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string(),
  screens: ScreenTypesSchema.optional(),
});

export type ScreenSchemeDetails = z.infer<typeof ScreenSchemeDetailsSchema>;
