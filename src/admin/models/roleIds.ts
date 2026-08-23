import { z } from 'zod';
/** The roles assigned to the resource ID. */

export const RoleIdsSchema = z.array(z.string());

export type RoleIds = z.infer<typeof RoleIdsSchema>;
