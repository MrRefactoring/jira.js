export interface CreatePermissionHolderRequest {
  /** The permission holder type. This must be "Group" or "AccountId". */
  type: 'Group' | 'AccountId' | string;
  /**
   * The permission holder value. This must be a group name if the type is "Group" or an account ID if the type is
   * "AccountId".
   */
  value: string;
}
