import { pageSchema, type Page } from './page';
import { ResolutionJsonSchema, type ResolutionJson } from './resolutionJson';

export const PageResolutionJsonSchema = pageSchema(ResolutionJsonSchema);

/**
 * @deprecated Use `Page<ResolutionJson>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageResolutionJson = Page<ResolutionJson>;
