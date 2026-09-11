import { z } from 'zod';
import { apiObject } from '#/core';

export const UserWriteSchema = apiObject({
  active: z.boolean().optional(),
  applicationKeys: z.array(z.string()).optional(),
  displayName: z.string().optional(),
  emailAddress: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  notification: z.string().optional(),
  password: z.string().optional(),
  self: z.string().optional(),
});

export type UserWrite = z.infer<typeof UserWriteSchema>;
