import { z } from 'zod';
import { apiObject } from '#/core';

export const AuthParamsSchema = apiObject({
  password: z.string().optional(),
  username: z.string().optional(),
});

export type AuthParams = z.infer<typeof AuthParamsSchema>;
