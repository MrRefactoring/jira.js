import { z } from 'zod';
import { apiObject } from '#/core';
import { SimpleListWrapperApplicationRoleSchema } from './simpleListWrapperApplicationRole';
import { SimpleListWrapperGroupJsonSchema } from './simpleListWrapperGroupJson';

export const UserSchema = apiObject({
  active: z.boolean().optional(),
  applicationRoles: SimpleListWrapperApplicationRoleSchema.optional(),
  avatarUrls: z.record(z.string(), z.any()).optional(),
  deleted: z.boolean().optional(),
  displayName: z.string().optional(),
  emailAddress: z.string().optional(),
  expand: z.string().optional(),
  groups: SimpleListWrapperGroupJsonSchema.optional(),
  key: z.string().optional(),
  lastLoginTime: z.string().optional(),
  locale: z.string().optional(),
  name: z.string().optional(),
  self: z.url().optional(),
  timeZone: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
