import type { PrioritySchemeWithPaginatedPrioritiesAndProjects } from './prioritySchemeWithPaginatedPrioritiesAndProjects';
import type { TaskProgressNode } from './taskProgressNode';

/** Details of the updated priority scheme. */
export interface UpdatePrioritySchemeResponse {
  priorityScheme?: PrioritySchemeWithPaginatedPrioritiesAndProjects;
  task?: TaskProgressNode;
}
