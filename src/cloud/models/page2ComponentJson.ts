import { pageSchema, type Page } from './page';
import { ComponentJsonSchema, type ComponentJson } from './componentJson';

export const Page2ComponentJsonSchema = pageSchema(ComponentJsonSchema);

/**
 * @deprecated Use `Page<ComponentJson>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type Page2ComponentJson = Page<ComponentJson>;
