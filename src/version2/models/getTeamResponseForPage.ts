export interface GetTeamResponseForPage {
  /** The team ID. */
  id: string;
  /** The team name. This is returned if the type is "PlanOnly". */
  name?: string;
  /** The team type. This is "PlanOnly" or "Atlassian". */
  type: 'PlanOnly' | 'Atlassian' | string;
}
