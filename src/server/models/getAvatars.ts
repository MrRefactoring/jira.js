import { z } from 'zod';
import { apiObject } from '#/core';
import { AvatarSchema } from './avatar';

export const GetAvatarsSchema = apiObject({
  system: z.array(AvatarSchema).optional(),
  custom: z.array(AvatarSchema).optional(),
});

export type GetAvatars = z.infer<typeof GetAvatarsSchema>;
