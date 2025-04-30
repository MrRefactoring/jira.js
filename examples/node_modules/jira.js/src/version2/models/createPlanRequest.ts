import type { CreateCrossProjectReleaseRequest } from './createCrossProjectReleaseRequest';
import type { CreateCustomFieldRequest } from './createCustomFieldRequest';
import type { CreateExclusionRulesRequest } from './createExclusionRulesRequest';
import type { CreateIssueSourceRequest } from './createIssueSourceRequest';
import type { CreatePermissionRequest } from './createPermissionRequest';
import type { CreateSchedulingRequest } from './createSchedulingRequest';

export interface CreatePlanRequest {
  /** The cross-project releases to include in the plan. */
  crossProjectReleases?: CreateCrossProjectReleaseRequest[];
  /** The custom fields for the plan. */
  customFields?: CreateCustomFieldRequest[];
  exclusionRules?: CreateExclusionRulesRequest;
  /** The issue sources to include in the plan. */
  issueSources: CreateIssueSourceRequest[];
  /** The account ID of the plan lead. */
  leadAccountId?: string;
  /** The plan name. */
  name: string;
  /** The permissions for the plan. */
  permissions?: CreatePermissionRequest[];
  scheduling?: CreateSchedulingRequest;
}
