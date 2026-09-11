import { pageSchema, type Page } from './page';
import { VersionSchema, type Version } from './version';

export const PageVersionSchema = pageSchema(VersionSchema);

/** @deprecated Use `Page<Version>`, which describes the same shape. This alias is removed in the next major version. */
export type PageVersion = Page<Version>;
