export interface GetPermissionSchemeGrant {
  /** The ID of the permission scheme. */
  schemeId: number;
  /** The ID of the permission grant. */
  permissionId: number;
  /**
   * Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note
   * that permissions are always included when you specify any value. Expand options include:
   *
   * `all` Returns all expandable information. `field` Returns information about the custom field granted the
   * permission. `group` Returns information about the group that is granted the permission. `permissions` Returns all
   * permission grants for each permission scheme. `projectRole` Returns information about the project role granted the
   * permission. `user` Returns information about the user who is granted the permission.
   */
  expand?: string;
}
