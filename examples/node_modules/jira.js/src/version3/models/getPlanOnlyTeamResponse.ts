export interface GetPlanOnlyTeamResponse {
  /** The capacity for the plan-only team. */
  capacity?: number;
  /** The plan-only team ID. */
  id: number;
  /** The ID of the issue source for the plan-only team. */
  issueSourceId?: number;
  /** The account IDs of the plan-only team members. */
  memberAccountIds?: string[];
  /** The plan-only team name. */
  name: string;
  /** The planning style for the plan-only team. This is "Scrum" or "Kanban". */
  planningStyle: 'Scrum' | 'Kanban' | string;
  /** The sprint length for the plan-only team. */
  sprintLength?: number;
}
