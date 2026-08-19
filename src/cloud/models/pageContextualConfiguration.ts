import { pageSchema, type Page } from './page';
import { ContextualConfigurationSchema, type ContextualConfiguration } from './contextualConfiguration';

export const PageContextualConfigurationSchema = pageSchema(ContextualConfigurationSchema);

/**
 * @deprecated Use `Page<ContextualConfiguration>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageContextualConfiguration = Page<ContextualConfiguration>;
