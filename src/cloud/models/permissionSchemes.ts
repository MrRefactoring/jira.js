import { z } from 'zod';
import { apiObject } from '#/core';
import { PermissionSchemeSchema } from './permissionScheme';
/** List of all permission schemes. */

export const PermissionSchemesSchema = apiObject({
  /** Permission schemes list. */
  permissionSchemes: z.array(PermissionSchemeSchema).optional(),
});

export type PermissionSchemes = z.infer<typeof PermissionSchemesSchema>;
