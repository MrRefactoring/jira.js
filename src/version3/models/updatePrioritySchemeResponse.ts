import { PrioritySchemeWithPaginatedPrioritiesAndProjects } from './prioritySchemeWithPaginatedPrioritiesAndProjects';
import { TaskProgressNode } from './taskProgressNode';

/** Details of the updated priority scheme. */
export interface UpdatePrioritySchemeResponse {
  priorityScheme?: PrioritySchemeWithPaginatedPrioritiesAndProjects;
  task?: TaskProgressNode;
}
