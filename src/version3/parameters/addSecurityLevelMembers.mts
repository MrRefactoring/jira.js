import { SecuritySchemeMembersRequest } from '../models/index.mjs';

export interface AddSecurityLevelMembers extends SecuritySchemeMembersRequest {
  /** The ID of the issue security scheme. */
  schemeId: string;
  /** The ID of the issue security level. */
  levelId: string;
}
