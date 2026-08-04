import { z } from 'zod';
import { UpdateScreenSchemeDetailsSchema } from '../models';

export const UpdateScreenSchemeSchema = z.object({}).extend(UpdateScreenSchemeDetailsSchema.shape).extend({
  /** The ID of the screen scheme. */
  screenSchemeId: z.string(),
});

export type UpdateScreenScheme = z.input<typeof UpdateScreenSchemeSchema>;
