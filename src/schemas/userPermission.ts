export interface Userpermission {
    [key: string]: any;
    id: string;
    key: string;
    name: string;
    type: string;
    description: string;
    havePermission: boolean;
    deprecatedKey: boolean;
}
