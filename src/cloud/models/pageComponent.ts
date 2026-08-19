import { pageSchema, type Page } from './page';
import { ComponentSchema, type Component } from './component';

export const PageComponentSchema = pageSchema(ComponentSchema);

/** @deprecated Use `Page<Component>`, which describes the same shape. This alias is removed in the next major version. */
export type PageComponent = Page<Component>;
