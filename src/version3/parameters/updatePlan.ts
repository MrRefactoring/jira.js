import type {
  CreateCrossProjectReleaseRequest,
  CreateCustomFieldRequest,
  CreateExclusionRulesRequest,
  CreateIssueSourceRequest,
  CreatePermissionRequest,
  CreateSchedulingRequest,
} from '../models';

export interface UpdatePlan {
  /** The ID of the plan. */
  planId: number;
  /** Whether to accept group IDs instead of group names. Group names are deprecated. */
  useGroupId?: boolean;
  /** The cross-project releases to include in the plan. */
  crossProjectReleases?: CreateCrossProjectReleaseRequest[];
  /** The custom fields for the plan. */
  customFields?: CreateCustomFieldRequest[];
  exclusionRules?: CreateExclusionRulesRequest;
  /** The issue sources to include in the plan. */
  issueSources?: CreateIssueSourceRequest[];
  /** The account ID of the plan lead. */
  leadAccountId?: string;
  /** The plan name. */
  name?: string;
  /** The permissions for the plan. */
  permissions?: CreatePermissionRequest[];
  scheduling?: CreateSchedulingRequest;
}
