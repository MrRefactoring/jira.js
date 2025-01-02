export interface DeleteProject {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string;
  /** Whether this project is placed in the Jira recycle bin where it will be available for restoration. */
  enableUndo?: boolean;
}
