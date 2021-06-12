import { UpdateProjectDetails } from '../models';

export interface UpdateProject extends UpdateProjectDetails {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string;
  projectTypeKey?: string;
  projectTemplateKey?: string;
  /**
   * Use [expand](#expansion) to include additional information in the response. This parameter accepts a
   * comma-separated list. Note that the project description, issue types, and project lead are included in all
   * responses by default. Expand options include:
   *
   * `description` The project description. `issueTypes` The issue types associated with the project. `lead` The project
   * lead. `projectKeys` All project keys associated with the project.
   */
  expand?: string;
}
