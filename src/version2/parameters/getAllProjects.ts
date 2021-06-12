export interface GetAllProjects {
  /**
   * Use [expand](#expansion) to include additional information in the response. This parameter accepts a
   * comma-separated list. Expanded options include:
   *
   * `description` Returns the project description. `issueTypes` Returns all issue types associated with the project.
   * `lead` Returns information about the project lead. `projectKeys` Returns all project keys associated with the project.
   */
  expand?: string;
  /**
   * Returns the user's most recently accessed projects. You may specify the number of results to return up to a maximum
   * of 20. If access is anonymous, then the recently accessed projects are based on the current HTTP session.
   */
  recent?: number;
  /** A list of project properties to return for the project. This parameter accepts a comma-separated list. */
  properties?: string[];
}
