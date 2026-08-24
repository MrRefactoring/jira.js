import { pageSchema, type Page } from './page';
import { AgileVersionSchema, type AgileVersion } from './agileVersion';

export const PageAgileVersionSchema = pageSchema(AgileVersionSchema);

/**
 * @deprecated Use `Page<AgileVersion>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageAgileVersion = Page<AgileVersion>;
