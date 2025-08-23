import { z } from 'zod';
import { PermissionSchemeSchema } from './permissionScheme';

/** List of all permission schemes. */
export const PermissionSchemesSchema = z.object({
  /** Permission schemes list. */
  permissionSchemes: z.array(PermissionSchemeSchema).optional(),
});

export type PermissionSchemes = z.infer<typeof PermissionSchemesSchema>;
