import { pageSchema, type Page } from './page';
import { ScreenSchemeSchema, type ScreenScheme } from './screenScheme';

export const PageScreenSchemeSchema = pageSchema(ScreenSchemeSchema);

/**
 * @deprecated Use `Page<ScreenScheme>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageScreenScheme = Page<ScreenScheme>;
