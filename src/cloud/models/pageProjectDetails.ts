import { pageSchema, type Page } from './page';
import { ProjectDetailsSchema, type ProjectDetails } from './projectDetails';

export const PageProjectDetailsSchema = pageSchema(ProjectDetailsSchema);

/**
 * @deprecated Use `Page<ProjectDetails>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageProjectDetails = Page<ProjectDetails>;
