import { pageSchema, type Page } from './page';
import { ProjectSchema, type Project } from './project';

export const PageProjectSchema = pageSchema(ProjectSchema);

/** @deprecated Use `Page<Project>`, which describes the same shape. This alias is removed in the next major version. */
export type PageProject = Page<Project>;
