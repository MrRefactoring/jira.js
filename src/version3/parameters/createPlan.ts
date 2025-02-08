import {
  CreateCrossProjectReleaseRequest,
  CreateCustomFieldRequest,
  CreateExclusionRulesRequest,
  CreateIssueSourceRequest,
  CreatePermissionRequest,
  CreateSchedulingRequest,
} from '../models';

export interface CreatePlan {
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
