import { z } from 'zod';
import { apiObject } from '#/core';
/** The ID of a screen scheme. */

export const UpdateDefaultScreenSchemeSchema = apiObject({
  /** The ID of the screen scheme. */
  screenSchemeId: z.string(),
});

export type UpdateDefaultScreenScheme = z.infer<typeof UpdateDefaultScreenSchemeSchema>;
