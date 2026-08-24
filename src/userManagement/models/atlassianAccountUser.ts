import type { z } from 'zod';
import { apiObject } from '#/core';
import { NicknameSchema } from './nickname';
import { ZoneInfoSchema } from './zoneInfo';
import { LocaleSchema } from './locale';
import { ExtendedProfileSchema } from './extendedProfile';
import { UserSchema } from './user';

export const AtlassianAccountUserSchema = apiObject(UserSchema.shape).extend({
  nickname: NicknameSchema,
  zoneinfo: ZoneInfoSchema.optional(),
  locale: LocaleSchema.optional(),
  extended_profile: ExtendedProfileSchema.optional(),
});

export type AtlassianAccountUser = z.infer<typeof AtlassianAccountUserSchema>;
