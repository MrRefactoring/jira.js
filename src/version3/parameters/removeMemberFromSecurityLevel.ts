export interface RemoveMemberFromSecurityLevel {
  /** The ID of the issue security scheme. */
  schemeId: string;
  /** The ID of the issue security level. */
  levelId: string;
  /** The ID of the issue security level member to be removed. */
  memberId: string;
}
