export interface UserPermission {
    id: string;
    key: string;
    name: string;
    type: string;
    description: string;
    havePermission: boolean;
    deprecatedKey: boolean;
    [key: string]: unknown;
}
