import type { PrioritySchemeChangesWithoutMappings } from './prioritySchemeChangesWithoutMappings';

/** Update projects in a scheme */
export interface UpdateProjectsInSchemeRequest {
  add?: PrioritySchemeChangesWithoutMappings;
  remove?: PrioritySchemeChangesWithoutMappings;
}
