import { pageSchema, type Page } from './page';
import {
  PrioritySchemeWithPaginatedPrioritiesAndProjectsSchema,
  type PrioritySchemeWithPaginatedPrioritiesAndProjects,
} from './prioritySchemeWithPaginatedPrioritiesAndProjects';

export const PagePrioritySchemeWithPaginatedPrioritiesAndProjectsSchema = pageSchema(
  PrioritySchemeWithPaginatedPrioritiesAndProjectsSchema,
);

/**
 * @deprecated Use `Page<PrioritySchemeWithPaginatedPrioritiesAndProjects>`, which describes the same shape. This alias
 *   is removed in the next major version.
 */
export type PagePrioritySchemeWithPaginatedPrioritiesAndProjects =
  Page<PrioritySchemeWithPaginatedPrioritiesAndProjects>;
