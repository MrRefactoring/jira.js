import { PermissionGrant } from "./permissionGrant";
import { Scope } from "./scope";

export interface PermissionScheme {
    expand?: string;
    id?: number;
    self?: string;
    name: string;
    description?: string;
    scope?: Scope[];
    permissions?: PermissionGrant[];
    [key: string]: unknown;
}