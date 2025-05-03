import type { CreatePlanOnlyTeamRequest } from '../models';

export interface CreatePlanOnlyTeam extends CreatePlanOnlyTeamRequest {
  /** The ID of the plan. */
  planId: number;
}
