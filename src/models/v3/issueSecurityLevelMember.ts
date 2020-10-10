import { PermissionHolder } from './permissionHolder';

export interface IssueSecurityLevelMember {
  id: number;
  issueSecurityLevelId: number;
  holder?: PermissionHolder[];
}
