export interface SetIssueProperty {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** The key of the issue property. The maximum length is 255 characters. */
  propertyKey: string;
  /** The value of the issue property. Can be of any type. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propertyValue: any;
}
