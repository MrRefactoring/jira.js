import { z } from 'zod';
import { AccountIdSchema } from '../models';
import { AtlassianAccountUserSchema } from '../models';

export const UpdateProfileSchema = z.object(AtlassianAccountUserSchema.shape).extend({
  /** The ID of the user to update */
  accountId: AccountIdSchema,
});

export type UpdateProfile = z.input<typeof UpdateProfileSchema>;
