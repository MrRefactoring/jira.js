import { z } from 'zod';
import { apiObject } from '#/core';
/** The IDs of the screens for the screen types of the screen scheme. */

export const ScreenTypesSchema = apiObject({
  /** The ID of the create screen. */
  create: z.number().optional(),
  /** The ID of the default screen. Required when creating a screen scheme. */
  default: z.number(),
  /** The ID of the edit screen. */
  edit: z.number().optional(),
  /** The ID of the view screen. */
  view: z.number().optional(),
});

export type ScreenTypes = z.infer<typeof ScreenTypesSchema>;
