export interface IssueTypeUpdate {
  /** The ID of an issue type avatar. */
  avatarId?: number;
  /** The description of the issue type. */
  description?: string;
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name?: string;
}
