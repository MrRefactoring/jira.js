import { z } from 'zod';
import { apiObject } from '#/core';
import { UserLinkSchema } from './userLink';

export const UserSchema = apiObject({
  name: z.string().optional(),
  key: z.string().optional(),
  emailAddress: z.string().optional(),
  displayName: z.string().optional(),
  active: z.boolean().optional(),
  timeZone: z.string().optional(),
  _links: UserLinkSchema.optional(),
});

export type User = z.infer<typeof UserSchema>;
