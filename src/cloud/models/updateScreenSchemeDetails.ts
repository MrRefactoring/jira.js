import { z } from 'zod';
import { apiObject } from '#/core';
import { UpdateScreenTypesSchema } from './updateScreenTypes';
/** Details of a screen scheme. */

export const UpdateScreenSchemeDetailsSchema = apiObject({
  /** The description of the screen scheme. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string().optional(),
  screens: UpdateScreenTypesSchema.optional(),
});

export type UpdateScreenSchemeDetails = z.infer<typeof UpdateScreenSchemeDetailsSchema>;
