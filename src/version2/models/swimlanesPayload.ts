/** The payload for customising a swimlanes on a board */
export interface SwimlanesPayload {
  /** The custom swimlane definitions. */
  customSwimlanes?:
    | 'none, custom, parentChild, assignee, assigneeUnassignedFirst, epic, project, issueparent, issuechildren, request_type'
    | string;
  /** The name of the custom swimlane to use for work items that don't match any other swimlanes. */
  defaultCustomSwimlaneName?: string;
  /** The swimlane strategy for the board. */
  swimlaneStrategy?:
    | 'none'
    | 'custom'
    | 'parentChild'
    | 'assignee'
    | 'assigneeUnassignedFirst'
    | 'epic'
    | 'project'
    | 'issueparent'
    | 'issuechildren'
    | 'request_type'
    | string;
}
