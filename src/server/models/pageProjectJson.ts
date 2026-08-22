import { pageSchema, type Page } from './page';
import { ProjectJsonSchema, type ProjectJson } from './projectJson';

export const PageProjectJsonSchema = pageSchema(ProjectJsonSchema);

/** @deprecated Use `Page<ProjectJson>`, which describes the same shape. This alias is removed in the next major version. */
export type PageProjectJson = Page<ProjectJson>;
