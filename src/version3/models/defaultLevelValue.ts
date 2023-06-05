/** Details of scheme and new default level. */
export interface DefaultLevelValue {
  /**
   * The ID of the issue security level to set as default for the specified scheme. Providing null will reset the
   * default level.
   */
  defaultLevelId: string;
  /** The ID of the issue security scheme to set default level for. */
  issueSecuritySchemeId: string;
}
