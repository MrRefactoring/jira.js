import { z } from 'zod';
import { UpdateScreenSchemeDetailsSchema } from '../models';

export const UpdateScreenSchemeSchema = z
  .object({
    /** The ID of the screen scheme. */
    screenSchemeId: z.string(),
  })
  .extend(UpdateScreenSchemeDetailsSchema.shape);

export type UpdateScreenScheme = z.input<typeof UpdateScreenSchemeSchema>;
