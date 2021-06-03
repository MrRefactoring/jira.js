export interface GetProject {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string;
  /**
   * Use [expand](#expansion) to include additional information in the response. This parameter accepts a
   * comma-separated list. Note that the project description, issue types, and project lead are included in all
   * responses by default. Expand options include:
   *
   * `description` The project description. `issueTypes` The issue types associated with the project. `lead` The project
   * lead. `projectKeys` All project keys associated with the project. `issueTypeHierarchy` The project issue type hierarchy.
   */
  expand?: string;
  /** A list of project properties to return for the project. This parameter accepts a comma-separated list. */
  properties?: string[];
}
