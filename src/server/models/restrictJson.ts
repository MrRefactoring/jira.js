import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupJsonSchema } from './groupJson';
import { PermissionJsonSchema } from './permissionJson';

export const RestrictJsonSchema = apiObject({
  groups: z.array(GroupJsonSchema).optional(),
  permissions: z.array(PermissionJsonSchema).optional(),
});

export type RestrictJson = z.infer<typeof RestrictJsonSchema>;
