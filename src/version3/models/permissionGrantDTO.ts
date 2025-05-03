import type { ProjectCreateResourceIdentifier } from './projectCreateResourceIdentifier';

/** List of permission grants */
export interface PermissionGrantDTO {
  applicationAccess?: string[];
  groupCustomFields?: ProjectCreateResourceIdentifier[];
  groups?: ProjectCreateResourceIdentifier[];
  permissionKeys?: string[];
  projectRoles?: ProjectCreateResourceIdentifier[];
  specialGrants?: string[];
  userCustomFields?: ProjectCreateResourceIdentifier[];
  users?: ProjectCreateResourceIdentifier[];
}
