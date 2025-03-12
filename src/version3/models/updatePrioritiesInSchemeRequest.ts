import type { PrioritySchemeChangesWithoutMappings } from './prioritySchemeChangesWithoutMappings';

/** Update priorities in a scheme */
export interface UpdatePrioritiesInSchemeRequest {
  add?: PrioritySchemeChangesWithoutMappings;
  remove?: PrioritySchemeChangesWithoutMappings;
}
