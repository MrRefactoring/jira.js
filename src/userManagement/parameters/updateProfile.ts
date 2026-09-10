import { z } from 'zod';
import { AccountIdSchema } from '../models';
import { NameSchema } from '../models';
import { NicknameSchema } from '../models';
import { ZoneInfoSchema } from '../models';
import { LocaleSchema } from '../models';
import { ExtendedProfileSchema } from '../models';

export const UpdateProfileSchema = z.object({
  /** The ID of the user to update */
  accountId: AccountIdSchema,
  name: NameSchema.optional(),
  nickname: NicknameSchema.optional(),
  zoneinfo: ZoneInfoSchema.optional(),
  locale: LocaleSchema.optional(),
  extended_profile: ExtendedProfileSchema.optional(),
});

export type UpdateProfile = z.input<typeof UpdateProfileSchema>;
