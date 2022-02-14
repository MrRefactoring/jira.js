/** Filter for a User Picker (single) custom field. */
export interface UserFilter {
  /** Whether the filter is enabled. */
  enabled: boolean;
  /**
   * User groups autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum
   * of 10 groups can be provided.
   */
  groups?: string[];
  /**
   * Roles that autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of
   * 10 roles can be provided.
   */
  roleIds?: number[];
}
