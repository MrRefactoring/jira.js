import { z } from 'zod';
import { apiObject } from '#/core';
/** The ID of a screen scheme. */

export const ScreenSchemeIdSchema = apiObject({
  /** The ID of the screen scheme. */
  id: z.number(),
});

export type ScreenSchemeId = z.infer<typeof ScreenSchemeIdSchema>;
