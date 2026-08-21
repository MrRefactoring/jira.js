import { z } from 'zod';
import { apiObject } from '#/core';

export const PasswordPolicyUpdateUserSchema = apiObject({
  newPassword: z.string().optional(),
  oldPassword: z.string().optional(),
  username: z.string().optional(),
});

export type PasswordPolicyUpdateUser = z.infer<typeof PasswordPolicyUpdateUserSchema>;
