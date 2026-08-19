import { pageSchema, type Page } from './page';
import { ContextDefaultValuesSchema, type ContextDefaultValues } from './contextDefaultValues';

export const PageContextDefaultValuesSchema = pageSchema(ContextDefaultValuesSchema);

/**
 * @deprecated Use `Page<ContextDefaultValues>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageContextDefaultValues = Page<ContextDefaultValues>;
