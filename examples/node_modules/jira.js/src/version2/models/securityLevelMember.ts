import type { PermissionHolder } from './permissionHolder';

/** Issue security level member. */
export interface SecurityLevelMember {
  holder?: PermissionHolder;
  /** The ID of the issue security level member. */
  id: string;
  /** The ID of the issue security level. */
  issueSecurityLevelId: string;
  /** The ID of the issue security scheme. */
  issueSecuritySchemeId: string;
}
