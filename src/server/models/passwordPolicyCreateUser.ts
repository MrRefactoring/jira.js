import { z } from 'zod';
import { apiObject } from '#/core';

export const PasswordPolicyCreateUserSchema = apiObject({
  displayName: z.string().optional(),
  emailAddress: z.string().optional(),
  password: z.string().optional(),
  username: z.string().optional(),
});

export type PasswordPolicyCreateUser = z.infer<typeof PasswordPolicyCreateUserSchema>;
