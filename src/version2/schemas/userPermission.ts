import { z } from 'zod';

/** Details of a permission and its availability to a user. */
export const UserPermissionSchema = z.object({
  /**
   * Indicate whether the permission key is deprecated. Note that deprecated keys cannot be used in the `permissions
   * parameter of Get my permissions. Deprecated keys are not returned by Get all permissions.`
   */
  deprecatedKey: z.boolean().optional(),
  /** The description of the permission. */
  description: z.string().optional(),
  /** Whether the permission is available to the user in the queried context. */
  havePermission: z.boolean().optional(),
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
  /** The name of the permission. */
  name: z.string().optional(),
  /** The type of the permission. */
  type: z.enum(['GLOBAL', 'PROJECT']).optional(),
});

export type UserPermission = z.infer<typeof UserPermissionSchema>;
