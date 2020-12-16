export interface IssueTypeCreateBean {
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name: string;
  /** The description of the issue type. */
  description?: string;
  /** Whether the issue type is `subtype` or `standard`. Defaults to `standard`. */
  type?: string;
}
