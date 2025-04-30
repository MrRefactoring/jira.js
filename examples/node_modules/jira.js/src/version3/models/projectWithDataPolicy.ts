import type { ProjectDataPolicy } from './projectDataPolicy';

/** Details about data policies for a project. */
export interface ProjectWithDataPolicy {
  dataPolicy: ProjectDataPolicy;
  /** The project ID. */
  id: number;
}
