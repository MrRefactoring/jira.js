/** @deprecated Use Id instead. */
export type IdBean = Id;

export interface Id {
  /**
   * The ID of the permission scheme to associate with the project. Use the [Get all permission
   * schemes](#api-rest-api-3-permissionscheme-get) resource to get a list of permission scheme IDs.
   */
  id: number;
}
