import { z } from 'zod';
import { apiObject } from '#/core';
import { GrantToPermissionInputSchema } from './grantToPermissionInput';

export const PermissionsInputSchema = apiObject({
  grants: z.array(GrantToPermissionInputSchema).optional(),
  permissionKeys: z.array(z.string()).optional(),
});

export type PermissionsInput = z.infer<typeof PermissionsInputSchema>;
