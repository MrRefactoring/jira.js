export interface IssueTypeUpdateBean {
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name?: string;
  /** The description of the issue type. */
  description?: string;
  /** The ID of an issue type avatar. */
  avatarId?: number;
}
