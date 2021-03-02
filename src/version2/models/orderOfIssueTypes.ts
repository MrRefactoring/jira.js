/**
 * An ordered list of issue type IDs and information about where to move them. */
export interface OrderOfIssueTypes {
  /** A list of the issue type IDs to move. The order of the issue type IDs in the list is the order they are given after the move. */
  issueTypeIds: string[];
  /** The ID of the issue type to place the moved issue types after. Required if `position` isn't provided. */
  after?: string;
  /** The position the issue types should be moved to. Required if `after` isn't provided. */
  position?: string;
}
