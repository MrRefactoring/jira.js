import { z } from 'zod';
import { apiObject } from '#/core';

export const PasswordSchema = apiObject({
  currentPassword: z.string().optional(),
  password: z.string().optional(),
});

export type Password = z.infer<typeof PasswordSchema>;
