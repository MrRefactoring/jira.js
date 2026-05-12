import { z } from 'zod';
import { ScreenTypesSchema } from '#/models/screenTypes';

/** Details of a screen scheme. */
export const ScreenSchemeDetailsSchema = z.object({
  /** The description of the screen scheme. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: z.string(),
  screens: ScreenTypesSchema.optional(),
});

export type ScreenSchemeDetails = z.infer<typeof ScreenSchemeDetailsSchema>;
