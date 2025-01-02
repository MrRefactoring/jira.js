import type { SecuritySchemeLevelMember } from './securitySchemeLevelMember.mjs';

/** Details of issue security scheme level new members. */
export interface SecuritySchemeMembersRequest {
  /** The list of level members which should be added to the issue security scheme level. */
  members: SecuritySchemeLevelMember[];
}
