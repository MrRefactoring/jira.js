import type { z } from 'zod';
import { apiObject } from '#/core';
import { AtlassianAccountUserSchema } from './atlassianAccountUser';

export const GetProfileSchema = apiObject({
  account: AtlassianAccountUserSchema,
});

export type GetProfile = z.infer<typeof GetProfileSchema>;
