/** Details about the mapping from a status to a new status for an issue type. */
export interface StatusMapping {
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the status. */
  statusId: string;
  /** The ID of the new status. */
  newStatusId: string;
}
