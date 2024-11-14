import type { PermissionHolder } from './permissionHolder.js';

/** Issue security level member. */
export interface IssueSecurityLevelMember {
  /** The ID of the issue security level member. */
  id: number;
  /** The ID of the issue security level. */
  issueSecurityLevelId: number;
  holder?: PermissionHolder;
}
