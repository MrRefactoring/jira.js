import { BulkProjectPermissions } from "./bulkProjectPermissions";

export interface BulkPermissionsRequestBean {
    projectPermissions: BulkProjectPermissions[];
    globalPermissions: string[];
    accountId: string;
}