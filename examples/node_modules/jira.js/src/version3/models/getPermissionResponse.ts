import type { GetPermissionHolderResponse } from './getPermissionHolderResponse';

export interface GetPermissionResponse {
  holder?: GetPermissionHolderResponse;
  /** The permission type. This is "View" or "Edit". */
  type: 'View' | 'Edit' | string;
}
