import type { SecuritySchemeMembersRequest } from '../models/index.js';

export interface AddSecurityLevelMembers extends SecuritySchemeMembersRequest {
  /** The ID of the issue security scheme. */
  schemeId: string;
  /** The ID of the issue security level. */
  levelId: string;
}
