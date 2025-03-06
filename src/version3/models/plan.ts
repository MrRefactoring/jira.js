import type { GetCrossProjectReleaseResponse } from './getCrossProjectReleaseResponse';
import type { GetCustomFieldResponse } from './getCustomFieldResponse';
import type { GetExclusionRulesResponse } from './getExclusionRulesResponse';
import type { GetIssueSourceResponse } from './getIssueSourceResponse';
import type { GetPermissionResponse } from './getPermissionResponse';
import type { GetSchedulingResponse } from './getSchedulingResponse';

export interface Plan {
  /** The cross-project releases included in the plan. */
  crossProjectReleases?: GetCrossProjectReleaseResponse[];
  /** The custom fields for the plan. */
  customFields?: GetCustomFieldResponse[];
  exclusionRules?: GetExclusionRulesResponse;
  /** The plan ID. */
  id: number;
  /** The issue sources included in the plan. */
  issueSources?: GetIssueSourceResponse[];
  /** The date when the plan was last saved in UTC. */
  lastSaved?: string;
  /** The account ID of the plan lead. */
  leadAccountId?: string;
  /** The plan name. */
  name?: string;
  /** The permissions for the plan. */
  permissions?: GetPermissionResponse[];
  scheduling?: GetSchedulingResponse;
  /** The plan status. This is "Active", "Trashed" or "Archived". */
  status: 'Active' | 'Trashed' | 'Archived' | string;
}
