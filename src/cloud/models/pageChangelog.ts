import { pageSchema, type Page } from './page';
import { ChangelogSchema, type Changelog } from './changelog';

export const PageChangelogSchema = pageSchema(ChangelogSchema);

/** @deprecated Use `Page<Changelog>`, which describes the same shape. This alias is removed in the next major version. */
export type PageChangelog = Page<Changelog>;
