import { z } from 'zod';

/**
 * Details of a user, group, field, or project role that holds a permission. See [Holder
 * object](../api-group-permission-schemes/#holder-object) in _Get all permission schemes_ for more information.
 */
export const PermissionHolderSchema = z.object({
  /** Expand options that include additional permission holder details in the response. */
  expand: z.string().optional(),
  /**
   * As a group's name can change, use of `value` is recommended. The identifier associated withthe `type` value that
   * defines the holder of the permission.
   */
  parameter: z.string().optional(),
  /** The type of permission holder. */
  type: z.string(),
  /** The identifier associated with the `type` value that defines the holder of the permission. */
  value: z.string().optional(),
});

export type PermissionHolder = z.infer<typeof PermissionHolderSchema>;
