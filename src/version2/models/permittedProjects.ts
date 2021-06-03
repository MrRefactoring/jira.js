import { ProjectIdentifierBean } from './projectIdentifierBean';

/** A list of projects in which a user is granted permissions. */
export interface PermittedProjects {
  /** A list of projects. */
  projects?: ProjectIdentifierBean[];
}
