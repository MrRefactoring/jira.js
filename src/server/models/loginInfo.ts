import { z } from 'zod';
import { apiObject } from '#/core';

export const LoginInfoSchema = apiObject({
  failedLoginCount: z.number().optional(),
  lastFailedLoginTime: z.coerce.date().optional(),
  loginCount: z.number().optional(),
  previousLoginTime: z.coerce.date().optional(),
});

export type LoginInfo = z.infer<typeof LoginInfoSchema>;
