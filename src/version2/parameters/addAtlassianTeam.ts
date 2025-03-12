import type { AddAtlassianTeamRequest } from '../models';

export interface AddAtlassianTeam extends AddAtlassianTeamRequest {
  /** The ID of the plan. */
  planId: number;
}
