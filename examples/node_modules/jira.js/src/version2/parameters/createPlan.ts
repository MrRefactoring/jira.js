import type { CreatePlanRequest } from '../models';

export interface CreatePlan extends CreatePlanRequest {
  /** Whether to accept group IDs instead of group names. Group names are deprecated. */
  useGroupId?: boolean;
}
