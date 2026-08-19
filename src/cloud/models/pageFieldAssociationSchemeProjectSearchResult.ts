import { pageSchema, type Page } from './page';
import {
  FieldAssociationSchemeProjectSearchResultSchema,
  type FieldAssociationSchemeProjectSearchResult,
} from './fieldAssociationSchemeProjectSearchResult';

export const PageFieldAssociationSchemeProjectSearchResultSchema = pageSchema(
  FieldAssociationSchemeProjectSearchResultSchema,
);

/**
 * @deprecated Use `Page<FieldAssociationSchemeProjectSearchResult>`, which describes the same shape. This alias is
 *   removed in the next major version.
 */
export type PageFieldAssociationSchemeProjectSearchResult = Page<FieldAssociationSchemeProjectSearchResult>;
