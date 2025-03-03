export interface AddAtlassianTeamRequest {
  /** The capacity for the Atlassian team. */
  capacity?: number;
  /** The Atlassian team ID. */
  id: string;
  /** The ID of the issue source for the Atlassian team. */
  issueSourceId?: number;
  /** The planning style for the Atlassian team. This must be "Scrum" or "Kanban". */
  planningStyle: 'Scrum' | 'Kanban' | string;
  /** The sprint length for the Atlassian team. */
  sprintLength?: number;
}
