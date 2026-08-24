import type { z } from 'zod';
import { apiObject } from '#/core';
import { AtlassianAccountUserSchema } from './atlassianAccountUser';

export const UpdateProfileSchema = apiObject({
  account: AtlassianAccountUserSchema,
});

export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;
