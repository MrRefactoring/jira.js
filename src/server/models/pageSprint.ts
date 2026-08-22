import { pageSchema, type Page } from './page';
import { SprintSchema, type Sprint } from './sprint';

export const PageSprintSchema = pageSchema(SprintSchema);

/** @deprecated Use `Page<Sprint>`, which describes the same shape. This alias is removed in the next major version. */
export type PageSprint = Page<Sprint>;
