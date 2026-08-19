import { pageSchema, type Page } from './page';
import { ScreenWithTabSchema, type ScreenWithTab } from './screenWithTab';

export const PageScreenWithTabSchema = pageSchema(ScreenWithTabSchema);

/**
 * @deprecated Use `Page<ScreenWithTab>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageScreenWithTab = Page<ScreenWithTab>;
