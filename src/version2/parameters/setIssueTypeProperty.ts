export interface SetIssueTypeProperty {
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The key of the issue type property. The maximum length is 255 characters. */
  propertyKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propertyValue: any;
}
