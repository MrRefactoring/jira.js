import { pageSchema, type Page } from './page';
import { ProjectFieldSchema, type ProjectField } from './projectField';

export const PageProjectFieldSchema = pageSchema(ProjectFieldSchema);

/**
 * @deprecated Use `Page<ProjectField>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageProjectField = Page<ProjectField>;
