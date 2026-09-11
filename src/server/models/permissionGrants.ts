import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionGrantSchema } from './permissionGrant';

export const PermissionGrantsSchema = apiObject({
  expand: z.string().optional(),
  permissions: z.array(PermissionGrantSchema).optional(),
});

export type PermissionGrants = z.infer<typeof PermissionGrantsSchema>;
