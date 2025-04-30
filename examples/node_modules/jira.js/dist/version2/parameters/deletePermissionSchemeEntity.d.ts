export interface DeletePermissionSchemeEntity {
    /** The ID of the permission scheme to delete the permission grant from. */
    schemeId: number;
    /** The ID of the permission grant to delete. */
    permissionId: number;
}
