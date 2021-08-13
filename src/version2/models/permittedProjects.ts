import { ProjectIdentifier } from './projectIdentifier';

/** A list of projects in which a user is granted permissions. */
export interface PermittedProjects {
  /** A list of projects. */
  projects?: ProjectIdentifier[];
}
