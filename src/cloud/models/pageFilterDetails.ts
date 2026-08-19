import { pageSchema, type Page } from './page';
import { FilterDetailsSchema, type FilterDetails } from './filterDetails';

export const PageFilterDetailsSchema = pageSchema(FilterDetailsSchema);

/**
 * @deprecated Use `Page<FilterDetails>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageFilterDetails = Page<FilterDetails>;
