import { z } from 'zod';
import { apiObject } from '#/core';
import { AvatarSchema } from './avatar';

export const GetAllProjectAvatarsSchema = apiObject({
  system: z.array(AvatarSchema).optional(),
  custom: z.array(AvatarSchema).optional(),
});

export type GetAllProjectAvatars = z.infer<typeof GetAllProjectAvatarsSchema>;
