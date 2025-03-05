import type { PermissionHolder } from './permissionHolder';

/** Issue security level member. */
export interface IssueSecurityLevelMember {
  holder?: PermissionHolder;
  /** The ID of the issue security level member. */
  id: number;
  /** The ID of the issue security level. */
  issueSecurityLevelId: number;
}
