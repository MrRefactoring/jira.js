import { z } from 'zod';
import { apiObject } from '#/core';

export const UserSchema = apiObject({
  avatarUrl: z.string().optional(),
  displayName: z.string().optional(),
  name: z.string().optional(),
  key: z.string().optional(),
  html: z.string().optional(),
  renderedLink: z.string().optional(),
  isDeleted: z.boolean().optional(),
  lastSeenVersion: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
