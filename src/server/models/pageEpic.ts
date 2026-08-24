import { pageSchema, type Page } from './page';
import { EpicSchema, type Epic } from './epic';

export const PageEpicSchema = pageSchema(EpicSchema);

/** @deprecated Use `Page<Epic>`, which describes the same shape. This alias is removed in the next major version. */
export type PageEpic = Page<Epic>;
