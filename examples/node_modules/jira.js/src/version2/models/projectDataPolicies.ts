import type { ProjectWithDataPolicy } from './projectWithDataPolicy';

/** Details about data policies for a list of projects. */
export interface ProjectDataPolicies {
  /** List of projects with data policies. */
  projectDataPolicies?: ProjectWithDataPolicy[];
}
