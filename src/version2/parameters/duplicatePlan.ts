import type { DuplicatePlanRequest } from '../models';

export interface DuplicatePlan extends DuplicatePlanRequest {
  /** The ID of the plan. */
  planId: number;
}
