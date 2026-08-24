import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionHolderSchema } from './permissionHolder';

export const PermissionGrantSchema = apiObject({
  holder: PermissionHolderSchema.optional(),
  id: z.number().optional(),
  permission: z.string().optional(),
  self: z.url().optional(),
});

export type PermissionGrant = z.infer<typeof PermissionGrantSchema>;
