import { PrioritySchemeWithPaginatedPrioritiesAndProjects } from './prioritySchemeWithPaginatedPrioritiesAndProjects';
import { TaskProgressBeanJsonNode } from './taskProgressBeanJsonNode';

/** Details of the updated priority scheme. */
export interface UpdatePrioritySchemeResponse {
  priorityScheme?: PrioritySchemeWithPaginatedPrioritiesAndProjects;
  task?: TaskProgressBeanJsonNode;
}
