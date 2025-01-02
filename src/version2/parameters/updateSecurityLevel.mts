import { UpdateIssueSecurityLevelDetails } from '../models/index.mjs';

export interface UpdateSecurityLevel extends UpdateIssueSecurityLevelDetails {
  /** The ID of the issue security scheme level belongs to. */
  schemeId: string;
  /** The ID of the issue security level to update. */
  levelId: string;
}
