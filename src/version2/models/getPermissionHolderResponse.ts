export interface GetPermissionHolderResponse {
  /** The permission holder type. This is "Group" or "AccountId". */
  type: 'Group' | 'AccountId' | string;
  /**
   * The permission holder value. This is a group name if the type is "Group" or an account ID if the type is
   * "AccountId".
   */
  value: string;
}
