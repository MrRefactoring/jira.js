import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionSchemeSchema } from './permissionScheme';

export const PermissionSchemesSchema = apiObject({
  permissionSchemes: z.array(PermissionSchemeSchema).optional(),
});

export type PermissionSchemes = z.infer<typeof PermissionSchemesSchema>;
