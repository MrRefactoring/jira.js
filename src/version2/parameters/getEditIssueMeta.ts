export interface GetEditIssueMeta {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** Whether hidden fields should be returned. Available to connect app users with admin permissions. */
  overrideScreenSecurity?: boolean;
  /** Whether non-editable fields should be returned. Available to connect app users with admin permissions. */
  overrideEditableFlag?: boolean;
}
