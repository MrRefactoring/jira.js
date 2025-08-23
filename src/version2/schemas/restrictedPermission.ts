import { z } from 'zod';

/** Details of the permission. */
export const RestrictedPermissionSchema = z.object({
  /**
   * The ID of the permission. Either `id` or `key` must be specified. Use [Get all
   * permissions](#api-rest-api-2-permissions-get) to get the list of permissions.
   */
  id: z.string().optional(),
  /**
   * The key of the permission. Either `id` or `key` must be specified. Use [Get all
   * permissions](#api-rest-api-2-permissions-get) to get the list of permissions.
   */
  key: z.string().optional(),
});

export type RestrictedPermission = z.infer<typeof RestrictedPermissionSchema>;
