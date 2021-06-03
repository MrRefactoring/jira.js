export interface GetProjectVersions {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string;
  /**
   * Use [expand](#expansion) to include additional information in the response. This parameter accepts `operations`,
   * which returns actions that can be performed on the version.
   */
  expand?: string;
}
