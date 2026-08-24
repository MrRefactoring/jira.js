import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';
import { FilterPermissionSchema } from './filterPermission';
import { UserListWrapperSchema } from './userListWrapper';

export const FilterSchema = apiObject({
  description: z.string().optional(),
  editable: z.boolean().optional(),
  favourite: z.boolean().optional(),
  id: z.string().optional(),
  jql: z.string().optional(),
  name: z.string().optional(),
  owner: UserSchema.optional(),
  searchUrl: z.url().optional(),
  self: z.url().optional(),
  sharePermissions: z.array(FilterPermissionSchema).optional(),
  sharedUsers: UserListWrapperSchema.optional(),
  viewUrl: z.url().optional(),
});

export type Filter = z.infer<typeof FilterSchema>;
