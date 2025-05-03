import type { CreatePermissionHolderRequest } from './createPermissionHolderRequest';

export interface CreatePermissionRequest {
  holder?: CreatePermissionHolderRequest;
  /** The permission type. This must be "View" or "Edit". */
  type: 'View' | 'Edit' | string;
}
