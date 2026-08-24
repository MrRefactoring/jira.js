import { z } from 'zod';
import { apiObject } from '#/core';
import { AvatarSchema } from './avatar';

export const GetAllUserAvatarsSchema = apiObject({
  system: z.array(AvatarSchema).optional(),
  custom: z.array(AvatarSchema).optional(),
});

export type GetAllUserAvatars = z.infer<typeof GetAllUserAvatarsSchema>;
