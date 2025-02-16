export interface GetAvailableTransitions {
  /** Ids or keys of the issues to get transitions available for them. */
  issueIdsOrKeys: (number | string)[];
  /** The end cursor for use in pagination. */
  endingBefore?: string;
  /** The start cursor for use in pagination. */
  startingAfter?: string;
}
