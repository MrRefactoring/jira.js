import { BulkProjectPermissionGrants } from './bulkProjectPermissionGrants';

export interface BulkPermissionGrants {
    projectPermissions: BulkProjectPermissionGrants[];
    globalPermissions: string[];
}
