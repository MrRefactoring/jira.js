/** Details of a permission and its availability to a user. */
export interface UserPermission {
  /**
   * The ID of the permission. Either `id` or `key` must be specified. Use [Get all
   * permissions](#api-rest-api-3-permissions-get) to get the list of permissions.
   */
  id?: string;
  /**
   * The key of the permission. Either `id` or `key` must be specified. Use [Get all
   * permissions](#api-rest-api-3-permissions-get) to get the list of permissions.
   */
  key?: string;
  /** The name of the permission. */
  name?: string;
  /** The type of the permission. */
  type?: string;
  /** The description of the permission. */
  description?: string;
  /** Whether the permission is available to the user in the queried context. */
  havePermission?: boolean;
  /**
   * Indicate whether the permission key is deprecated. Note that deprecated keys cannot be used in the `permissions
   * parameter of Get my permissions. Deprecated keys are not returned by Get all permissions.`
   */
  deprecatedKey?: boolean;
}
