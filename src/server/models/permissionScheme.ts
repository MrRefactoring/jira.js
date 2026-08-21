import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionGrantSchema } from './permissionGrant';

export const PermissionSchemeSchema = apiObject({
  description: z.string().optional(),
  expand: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  permissions: z.array(PermissionGrantSchema).optional(),
  self: z.url().optional(),
});

export type PermissionScheme = z.infer<typeof PermissionSchemeSchema>;
