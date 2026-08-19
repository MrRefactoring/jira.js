import { pageSchema, type Page } from './page';
import { ProjectFieldSchema, type ProjectField } from './projectField';

export const Page2ProjectFieldSchema = pageSchema(ProjectFieldSchema);

/**
 * @deprecated Use `Page<ProjectField>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type Page2ProjectField = Page<ProjectField>;
