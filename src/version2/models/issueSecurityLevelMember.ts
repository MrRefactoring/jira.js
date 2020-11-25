/**Issue security level member.*/
export interface IssueSecurityLevelMember {
    /**The ID of the issue security level member.*/
    id: number;
    /**The ID of the issue security level.*/
    issueSecurityLevelId: number;
    /**The user or group being granted the permission. It consists of a `type` and a type-dependent `parameter`. See [Holder object](#holder-object) in *Get all permission schemes* for more information.*/
    holder?: PermissionHolder[];
}