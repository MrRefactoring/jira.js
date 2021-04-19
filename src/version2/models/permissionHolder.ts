/**
 * Details of a user, group, field, or project role that holds a permission. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information. */
export interface PermissionHolder {
  /** The type of permission holder. */
  type: string;
  /** The identifier of permission holder. */
  parameter?: string;
  /** Expand options that include additional permission holder details in the response. */
  expand?: string;
}
