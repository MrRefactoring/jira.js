import { PermissionHolder } from "./permissionHolder";

export interface PermissionGrant {
    id: number;
    self: string;
    holder: PermissionHolder[];
    permission: string;
}