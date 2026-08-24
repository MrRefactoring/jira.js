import { z } from 'zod';
import { apiObject } from '#/core';

export const RoleActorSchema = apiObject({
  avatarUrl: z.url().optional(),
  name: z.string().optional(),
});

export type RoleActor = z.infer<typeof RoleActorSchema>;
