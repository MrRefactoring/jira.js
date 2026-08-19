import { pageSchema, type Page } from './page';
import { BulkContextualConfigurationSchema, type BulkContextualConfiguration } from './bulkContextualConfiguration';

export const PageBulkContextualConfigurationSchema = pageSchema(BulkContextualConfigurationSchema);

/**
 * @deprecated Use `Page<BulkContextualConfiguration>`, which describes the same shape. This alias is removed in the
 *   next major version.
 */
export type PageBulkContextualConfiguration = Page<BulkContextualConfiguration>;
