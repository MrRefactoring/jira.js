import type { z } from 'zod';
import { apiObject } from '#/core';
import { LoginInfoSchema } from './loginInfo';
import { SessionInfoSchema } from './sessionInfo';

export const AuthSuccessSchema = apiObject({
  loginInfo: LoginInfoSchema.optional(),
  session: SessionInfoSchema.optional(),
});

export type AuthSuccess = z.infer<typeof AuthSuccessSchema>;
