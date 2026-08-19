import { pageSchema, type Page } from './page';
import { ScreenSchema, type Screen } from './screen';

export const PageScreenSchema = pageSchema(ScreenSchema);

/** @deprecated Use `Page<Screen>`, which describes the same shape. This alias is removed in the next major version. */
export type PageScreen = Page<Screen>;
